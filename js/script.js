"use strict";

const formRadio = document.querySelector(".form-radio");
const formMetric = document.querySelector(".form-metric");
const formImperial = document.querySelector(".form-imperial");
const metric = document.getElementById("metric");
const imperial = document.getElementById("imperial");

const metricWeightValue = document.getElementById("metric-weight");
const metricHeightValue = document.getElementById("metric-height");

const imperialHeightFtValue = document.getElementById("imperial-height-ft");
const imperialHeightInValue = document.getElementById("imperial-height-in");
const imperialWeightStValue = document.getElementById("imperial-weight-st");
const imperialWeightLbsValue = document.getElementById("imperial-weight-lbs");

const BMIscore = document.getElementById("BMI-score");
const BMIrate = document.getElementById("BMI-rate");
const BMIrange = document.getElementById("BMI-range");

const calculateMetricBMI = function (height, weight) {
  return weight / (height / 100) ** 2;
};

const calculateImperialBMI = function (height, weight) {
  return (weight / height ** 2) * 703;
};

const renderBMIScore = function (score) {
  BMIscore.textContent = `${score.toFixed(1)}`;
  if (score <= 18.49) BMIrate.textContent = "underweight";
  else if (score >= 24.99) BMIrate.textContent = "overweight";
  else BMIrate.textContent = "healthy weight";
};

formRadio.addEventListener("click", function () {
  weight = 0;
  height = 0;
  imperialWeight = 0;
  imperialHeight = 0;
  metricWeightValue.value = "";
  metricHeightValue.value = "";
  imperialHeightFtValue.value = "";
  imperialHeightInValue.value = "";
  imperialWeightStValue.value = "";
  imperialWeightLbsValue.value = "";

  if (metric.checked) {
    // formMetric.classList.remove("hidden");
    formImperial.classList.add("hidden");
    formMetric.style.display = "grid";
  } else if (imperial.checked) {
    // formMetric.classList.add("hidden");
    formImperial.classList.remove("hidden");
    formMetric.style.display = "none";
  }
});

let weight, height, imperialWeight, imperialHeight;

metricWeightValue.addEventListener("input", function () {
  weight = metricWeightValue.valueAsNumber;
});

metricHeightValue.addEventListener("input", function () {
  height = metricHeightValue.valueAsNumber;
});

imperialHeightInValue.addEventListener("input", function () {
  imperialHeight =
    imperialHeightFtValue.valueAsNumber * 12 +
    imperialHeightInValue.valueAsNumber;
});

imperialWeightLbsValue.addEventListener("input", function () {
  imperialWeight =
    imperialWeightStValue.valueAsNumber * 14 +
    imperialWeightLbsValue.valueAsNumber;
});

document.addEventListener("input", function () {
  if (weight && height) {
    const score = calculateMetricBMI(height, weight);
    const idealWeightMin = 18.5 * (height / 100) ** 2;
    const idealWeightMax = 24.9 * (height / 100) ** 2;
    renderBMIScore(score);
    BMIrange.textContent = `${idealWeightMin.toFixed()}kgs - ${idealWeightMax.toFixed()}kgs`;
  }

  if (imperialWeight && imperialHeight) {
    const score = calculateImperialBMI(imperialHeight, imperialWeight);
    const idealWeightLbsMin = (18.5 * imperialHeight ** 2) / 703;
    const idealWeightLbsMax = (24.9 * imperialHeight ** 2) / 703;
    renderBMIScore(score);
    BMIrange.textContent = `${(idealWeightLbsMin / 14).toFixed()}st ${(
      idealWeightLbsMin % 14
    ).toFixed()}lbs - ${(idealWeightLbsMax / 14).toFixed()}st ${(
      idealWeightLbsMax % 14
    ).toFixed()}lbs`;
  }
});
