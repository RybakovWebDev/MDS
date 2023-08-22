import { keyframes } from "@emotion/react";

export const handleScrollShadow = (e, setShadowCast, setShadowCrew, setShadowSimilar, setShadowVideos) => {
  if (e.currentTarget.className.includes("movie-cast") && e.currentTarget.scrollLeft >= 200) setShadowCast(false);
  if (e.currentTarget.className.includes("movie-cast") && e.currentTarget.scrollLeft <= 200) setShadowCast(true);

  if (e.currentTarget.className.includes("movie-crew") && e.currentTarget.scrollTop >= 200) setShadowCrew(false);
  if (e.currentTarget.className.includes("movie-crew") && e.currentTarget.scrollTop <= 200) setShadowCrew(true);

  if (e.currentTarget.className.includes("movie-similar") && e.currentTarget.scrollTop >= 200) setShadowSimilar(false);
  if (e.currentTarget.className.includes("movie-similar") && e.currentTarget.scrollTop <= 200) setShadowSimilar(true);

  if (e.currentTarget.className.includes("videos") && e.currentTarget.scrollLeft >= 100) setShadowVideos(false);
  if (e.currentTarget.className.includes("videos") && e.currentTarget.scrollLeft <= 20) setShadowVideos(true);
};

export const formatMoney = (num) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  return formatter.format(num);
};

export const btnShakeAnimation = keyframes`0% { transform: translateX(-5px); }
  25% { transform: translateX(5px); }
  50% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
  100% { transform: translateX(0); }`;
