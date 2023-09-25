const crypto = require("crypto");
const { STSClient, AssumeRoleCommand } = require("@aws-sdk/client-sts");
const {
  S3Client,
  HeadObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const sharp = require("sharp");

const sts = new STSClient({
  region: process.env.ENV_AWS_REGION,
  credentials: {
    accessKeyId: process.env.ENV_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.ENV_AWS_SECRET_ACCESS_KEY,
  },
});

const roleToAssume = {
  RoleArn: process.env.ENV_AWS_ROLE_ARN,
  RoleSessionName: "mds-s3-session",
};

const getS3 = async () => {
  try {
    const data = await sts.send(new AssumeRoleCommand(roleToAssume));
    const creds = {
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken,
    };
    return new S3Client({ credentials: creds, region: process.env.ENV_AWS_REGION });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to initialize s3 object");
  }
};

const uploadFileToS3 = async (s3, file, userID) => {
  const fileContent = file.buffer;
  const fileName = crypto.createHash("sha256").update(fileContent).digest("hex");
  let oldFileName;

  try {
    const data = await s3.send(
      new ListObjectsV2Command({
        Bucket: process.env.S3_BUCKET,
        Prefix: `${userID}/`,
      })
    );

    if (data.Contents) {
      oldFileName = data.Contents[0].Key.split("/")[1];
    }
  } catch (err) {
    console.log(err);
    throw new Error("Failed to list files.");
  }

  try {
    await s3.send(
      new HeadObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: `${userID}/${fileName}`,
      })
    );
    const location = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${userID}/${fileName}`;
    return location;
  } catch (err) {
    if (err.code !== "NotFound" && err.message !== "UnknownError") {
      console.log(err);
      throw new Error("Failed to check if file exists in S3 bucket.");
    }
  }

  const params = {
    Bucket: process.env.S3_BUCKET,
    Key: `${userID}/${fileName}`,
    Body: fileContent,
  };

  try {
    await s3.send(new PutObjectCommand(params));
    const location = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${params.Key}`;

    return { location, oldFileName };
  } catch (err) {
    console.log(err);
    throw new Error("Failed to upload file.");
  }
};

const deleteFileFromS3 = async (s3, userID, fileName) => {
  try {
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: `${userID}/${fileName}`,
      })
    );
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete file.");
  }
};

const uploadFile = async (req, res) => {
  try {
    const s3 = await getS3();
    const { file } = req;
    const { userID } = req.body;
    if (["image/png", "image/jpeg"].includes(file.mimetype)) {
      const outputBuffer = await sharp(file.buffer).jpeg({ quality: 60 }).toBuffer();
      file.buffer = outputBuffer;
      file.mimetype = "image/jpeg";
    }
    const { location, oldFileName } = await uploadFileToS3(s3, file, userID);
    if (oldFileName) {
      await deleteFileFromS3(s3, userID, oldFileName);
    }
    res.status(200).json({ location });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const deleteFile = async (req, res) => {
  const { userID, fileName } = req.params;
  try {
    const s3 = await getS3();
    await deleteFileFromS3(s3, userID, fileName);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadFile, deleteFile };
