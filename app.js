const spicesKey = "recipeSpicesInventory";
const inventoryKey = "recipeMainInventory";
const spiceListEl = document.getElementById("spiceList");
const spiceNameEl = document.getElementById("spiceName");
const spiceAmountEl = document.getElementById("spiceAmount");
const addSpiceBtn = document.getElementById("addSpice");
const clearSpicesBtn = document.getElementById("clearSpices");
const inventoryListEl = document.getElementById("inventoryList");
const mainIngredientNameEl = document.getElementById("mainIngredientName");
const mainIngredientAmountEl = document.getElementById("mainIngredientAmount");
const addInventoryBtn = document.getElementById("addInventory");
const clearInventoryBtn = document.getElementById("clearInventory");
const photoInput = document.getElementById("photoInput");
const apiKeyEl = document.getElementById("apiKey");
const saveApiKeyBtn = document.getElementById("saveApiKey");
const clearApiKeyBtn = document.getElementById("clearApiKey");
const apiKeyStatusEl = document.getElementById("apiKeyStatus");
const apiKeyStorageKey = "anthropicApiKey";
const CLAUDE_MODEL = "claude-haiku-4-5";
let lastPhotoFile = null;
const generateRecipeBtn = document.getElementById("generateRecipeBtn");
const photoPreview = document.getElementById("photoPreview");
const ingredientSelect = document.getElementById("ingredientSelect");
const ingredientSearchEl = document.getElementById("ingredientSearch");
const ingredientSuggestions = document.getElementById("ingredientSuggestions");
const targetWeightEl = document.getElementById("mainAmount");
const cuisineSelect = document.getElementById("cuisineSelect");
const recommendBtn = document.getElementById("recommendBtn");
const recommendInventoryBtn = document.getElementById("recommendInventoryBtn");
const recommendationEl = document.getElementById("recommendation");
const photoHintEl = document.getElementById("photoHint");

const ingredientOptions = [
  "닭가슴살",
  "소고기",
  "돼지고기",
  "두부",
  "새우",
  "버섯",
  "감자",
  "양파",
  "브로콜리",
  "가지",
  "호박",
  "연근"
];

const recipes = {
  korean: {
    닭가슴살: {
      title: "닭가슴살 간장구이",
      description: "주재료 닭가슴살과 간장, 마늘, 설탕, 참기름을 사용한 한식 레시피입니다.",
      ingredients: [
        "닭가슴살 300g",
        "간장 25ml",
        "다진 마늘 15g",
        "올리고당 15g",
        "참기름 10ml",
        "후춧가루 약간"
      ],
      steps: [
        "닭가슴살 300g을 먹기 좋은 크기로 썬다.",
        "간장 25ml, 다진 마늘 15g, 올리고당 15g, 참기름 10ml를 섞어 양념장을 만든다.",
        "팬에 기름을 두르고 닭가슴살을 앞뒤로 5~6분씩 굽는다.",
        "양념장을 넣고 자작하게 졸여서 완성한다."
      ]
    },
    두부: {
      title: "두부조림",
      description: "간장과 고춧가루, 다진 마늘로 만든 양념장에 두부를 졸여내는 간단 한식요리입니다.",
      ingredients: [
        "두부 300g",
        "간장 20ml",
        "고춧가루 10g",
        "다진 마늘 10g",
        "물 80ml",
        "참기름 5ml"
      ],
      steps: [
        "두부를 2cm 두께로 썬다.",
        "간장 20ml, 고춧가루 10g, 다진 마늘 10g, 물 80ml를 섞어 양념장을 만든다.",
        "팬에 두부를 놓고 양념장을 부어 중불로 졸인다.",
        "양념이 스며들면 참기름 5ml를 두르고 마무리한다."
      ]
    },
    감자: {
      title: "감자조림",
      description: "감자를 간장 양념에 졸여서 만드는 한식 반찬입니다.",
      ingredients: [
        "감자 250g",
        "간장 20ml",
        "설탕 12g",
        "다진 마늘 8g",
        "물 100ml",
        "참기름 5ml"
      ],
      steps: [
        "감자를 깍둑썰기 한다.",
        "간장 20ml, 설탕 12g, 다진 마늘 8g, 물 100ml를 섞는다.",
        "냄비에 감자와 양념을 넣고 중약불에서 졸인다.",
        "양념이 자작해지면 참기름 5ml를 넣어 마무리한다."
      ]
    },
    소고기: {
      title: "소고기 간장볶음",
      description: "소고기와 간장, 마늘, 참기름으로 간단하게 볶아낸 한식 반찬입니다.",
      ingredients: [
        "소고기 300g",
        "간장 25ml",
        "다진 마늘 12g",
        "설탕 6g",
        "참기름 10ml",
        "후춧가루 약간"
      ],
      steps: [
        "소고기를 먹기 좋은 크기로 썬다.",
        "간장 25ml, 다진 마늘 12g, 설탕 6g을 섞어 양념장을 만든다.",
        "팬에 기름을 두르고 소고기를 볶는다.",
        "양념장을 넣고 잘 섞어가며 마무리한다."
      ]
    },
    돼지고기: {
      title: "돼지고기 두루치기",
      description: "돼지고기와 고추장, 간장, 마늘을 넣어 매콤하게 볶아낸 한식 요리입니다.",
      ingredients: [
        "돼지고기 300g",
        "고추장 20g",
        "간장 15ml",
        "다진 마늘 12g",
        "양파 80g",
        "고춧가루 10g"
      ],
      steps: [
        "돼지고기를 한입 크기로 썬다.",
        "팬에 기름을 두르고 돼지고기를 볶는다.",
        "고추장 20g, 간장 15ml, 다진 마늘 12g, 고춧가루 10g을 넣고 볶는다.",
        "양파를 넣고 함께 익히며 마무리한다."
      ]
    }
  },
  chinese: {
    닭가슴살: {
      title: "중식 칠리 치킨",
      description: "닭가슴살을 고추기름과 간장 베이스 소스로 볶아 매콤하게 즐기는 중식 요리입니다.",
      ingredients: [
        "닭가슴살 300g",
        "간장 20ml",
        "설탕 10g",
        "고추기름 15ml",
        "다진 마늘 12g",
        "물 40ml"
      ],
      steps: [
        "닭가슴살을 한입 크기로 썬다.",
        "팬에 고추기름 15ml를 두르고 다진 마늘 12g을 볶는다.",
        "닭가슴살을 넣고 겉면이 익을 때까지 볶는다.",
        "간장 20ml, 설탕 10g, 물 40ml를 넣고 졸인다."
      ]
    },
    새우: {
      title: "새우 칠리 소스",
      description: "새우와 양파를 고추소스, 간장으로 볶아낸 중식 스타일 요리입니다.",
      ingredients: [
        "새우 250g",
        "양파 80g",
        "고추장 15g",
        "간장 15ml",
        "물 40ml",
        "설탕 8g"
      ],
      steps: [
        "새우와 양파를 준비한다.",
        "팬에 기름을 두르고 양파를 볶는다.",
        "새우를 넣고 익으면 고추장 15g, 간장 15ml, 물 40ml, 설탕 8g을 넣고 볶는다.",
        "소스가 걸쭉해지면 완성한다."
      ]
    },
    브로콜리: {
      title: "브로콜리 마늘 볶음",
      description: "브로콜리를 다진 마늘과 함께 간단하게 볶아내는 중식 반찬입니다.",
      ingredients: [
        "브로콜리 250g",
        "다진 마늘 12g",
        "간장 15ml",
        "참기름 5ml",
        "물 20ml"
      ],
      steps: [
        "브로콜리를 먹기 좋은 크기로 자른다.",
        "팬에 기름을 두르고 다진 마늘 12g을 볶는다.",
        "브로콜리를 넣고 간장 15ml, 물 20ml를 넣어 볶는다.",
        "마지막에 참기름 5ml를 넣고 완성한다."
      ]
    },
    소고기: {
      title: "중식 소고기 볶음",
      description: "소고기와 간장, 굴소스를 사용해 감칠맛을 낸 중식 볶음 요리입니다.",
      ingredients: [
        "소고기 280g",
        "간장 25ml",
        "굴소스 15ml",
        "설탕 8g",
        "다진 마늘 10g",
        "참기름 5ml"
      ],
      steps: [
        "소고기를 얇게 썬다.",
        "팬에 기름을 두르고 다진 마늘을 볶는다.",
        "소고기를 넣고 익힌 뒤 간장, 굴소스, 설탕을 넣고 볶는다.",
        "참기름을 추가해 마무리한다."
      ]
    },
    호박: {
      title: "애호박 볶음",
      description: "애호박을 간장 양념과 함께 볶아낸 중식 스타일 반찬입니다.",
      ingredients: [
        "호박 240g",
        "간장 15ml",
        "다진 마늘 10g",
        "참기름 5ml",
        "고춧가루 5g"
      ],
      steps: [
        "애호박을 먹기 좋은 크기로 썬다.",
        "팬에 기름을 두르고 다진 마늘을 볶는다.",
        "애호박을 넣고 간장 15ml, 고춧가루 5g을 넣어 볶는다.",
        "마지막에 참기름 5ml를 넣고 완성한다."
      ]
    }
  },
  western: {
    닭가슴살: {
      title: "허브 닭가슴살 구이",
      description: "닭가슴살을 올리브오일과 허브로 구워내는 양식 스타일 레시피입니다.",
      ingredients: [
        "닭가슴살 300g",
        "소금 5g",
        "후춧가루 약간",
        "올리브오일 20ml",
        "말린 허브 5g"
      ],
      steps: [
        "닭가슴살에 소금, 후춧가루, 말린 허브를 뿌린다.",
        "팬에 올리브오일 20ml를 두르고 닭가슴살을 앞뒤로 5~6분씩 굽는다.",
        "속까지 잘 익으면 접시에 담아 완성한다."
      ]
    },
    버섯: {
      title: "버섯 크림 소스 파스타",
      description: "버섯과 생크림, 다진 마늘을 사용해 만드는 양식 파스타 소스입니다.",
      ingredients: [
        "버섯 200g",
        "생크림 120ml",
        "다진 마늘 10g",
        "파스타 120g",
        "소금 4g",
        "후춧가루 약간"
      ],
      steps: [
        "파스타를 끓는 물에 8~10분 삶는다.",
        "팬에 버터 또는 올리브오일을 두르고 다진 마늘을 볶는다.",
        "버섯과 생크림을 넣고 부드럽게 졸인다.",
        "삶은 파스타와 섞어 소금, 후추로 간을 한다."
      ]
    },
    양파: {
      title: "양파 허니 마리네이드",
      description: "양파를 꿀과 발사믹 식초로 마리네이드해 부드럽게 즐기는 서양식 반찬입니다.",
      ingredients: [
        "양파 180g",
        "꿀 20g",
        "발사믹 식초 15ml",
        "올리브오일 10ml",
        "소금 3g"
      ],
      steps: [
        "양파를 얇게 슬라이스한다.",
        "꿀 20g, 발사믹 식초 15ml, 올리브오일 10ml, 소금 3g을 섞어 마리네이드를 만든다.",
        "양파에 부어 10분 이상 재운다.",
        "접시에 담아 서빙한다."
      ]
    },
    소고기: {
      title: "소고기 스테이크",
      description: "소고기를 허브와 버터로 구워내는 간단한 양식 스테이크 요리입니다.",
      ingredients: [
        "소고기 320g",
        "소금 5g",
        "후춧가루 약간",
        "버터 15g",
        "말린 허브 5g"
      ],
      steps: [
        "소고기에 소금과 후춧가루를 뿌린다.",
        "팬에 버터를 녹이고 고기를 앞뒤로 굽는다.",
        "말린 허브를 뿌려 향을 더한다.",
        "적당한 익힘으로 완성한다."
      ]
    },
    호박: {
      title: "호박 크림 스프",
      description: "호박과 생크림을 부드럽게 끓여낸 서양식 호박 스프입니다.",
      ingredients: [
        "호박 250g",
        "생크림 100ml",
        "양파 50g",
        "소금 4g",
        "후춧가루 약간"
      ],
      steps: [
        "호박과 양파를 잘게 썬다.",
        "냄비에 재료를 넣고 물을 부어 끓인다.",
        "부드럽게 익으면 블렌더로 갈아준다.",
        "생크림과 소금, 후춧가루로 간을 맞춘다."
      ]
    }
  }
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function loadJsonArray(key) {
  try {
    const stored = localStorage.getItem(key);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

function loadSpices() {
  return loadJsonArray(spicesKey);
}

function saveSpices(items) {
  localStorage.setItem(spicesKey, JSON.stringify(items));
}

function loadInventory() {
  return loadJsonArray(inventoryKey);
}

function saveInventory(items) {
  localStorage.setItem(inventoryKey, JSON.stringify(items));
}

function renderSpices() {
  const spices = loadSpices();
  spiceListEl.innerHTML = "";
  if (spices.length === 0) {
    spiceListEl.innerHTML = "<li>등록된 조미료가 없습니다.</li>";
    return;
  }
  spices.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${escapeHtml(item.name)} - <input type="text" class="amount-input" data-edit="spice-${index}" value="${escapeHtml(item.amount)}" /> <button data-index="spice-${index}">삭제</button>`;
    spiceListEl.appendChild(li);
  });
}

function renderInventory() {
  const inventory = loadInventory();
  inventoryListEl.innerHTML = "";
  if (inventory.length === 0) {
    inventoryListEl.innerHTML = "<li>등록된 주재료가 없습니다.</li>";
    return;
  }
  inventory.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${escapeHtml(item.name)} - <input type="text" class="amount-input" data-edit="inv-${index}" value="${escapeHtml(item.amount)}" /> <button data-index="inv-${index}">삭제</button>`;
    inventoryListEl.appendChild(li);
  });
}

function addSpice() {
  const name = spiceNameEl.value.trim();
  const amount = spiceAmountEl.value.trim();
  if (!name || !amount) {
    alert("조미료 이름과 수량을 모두 입력해주세요.");
    return;
  }
  const spices = loadSpices();
  spices.push({ name, amount });
  saveSpices(spices);
  spiceNameEl.value = "";
  spiceAmountEl.value = "";
  renderSpices();
}

function removeSpice(index) {
  const spices = loadSpices();
  spices.splice(index, 1);
  saveSpices(spices);
  renderSpices();
}

function updateSpiceAmount(index, value) {
  const spices = loadSpices();
  if (!spices[index]) return;
  spices[index].amount = value.trim();
  saveSpices(spices);
}

function updateInventoryAmount(index, value) {
  const inventory = loadInventory();
  if (!inventory[index]) return;
  inventory[index].amount = value.trim();
  saveInventory(inventory);
}

function clearSpices() {
  if (!confirm("모든 조미료 정보를 삭제하시겠습니까?")) return;
  localStorage.removeItem(spicesKey);
  renderSpices();
}

function addInventory() {
  const name = mainIngredientNameEl.value.trim();
  const amount = Number(mainIngredientAmountEl.value);
  if (!name || !amount || amount <= 0) {
    alert("주재료 이름과 보유량을 정확히 입력해주세요.");
    return;
  }
  const inventory = loadInventory();
  const existingIndex = inventory.findIndex((item) => normalizeText(item.name) === normalizeText(name));
  const existingAmount = existingIndex >= 0 ? parseInventoryAmount(inventory[existingIndex].amount) : null;
  const addedAmount = { value: amount, unit: "g" };
  if (existingIndex >= 0 && existingAmount) {
    const combined = convertToBaseUnit(existingAmount);
    const newValue = combined.value + addedAmount.value;
    inventory[existingIndex].amount = `${formatScaledValue(newValue)}g`;
  } else {
    inventory.push({ name, amount: `${formatScaledValue(amount)}g` });
  }
  saveInventory(inventory);
  mainIngredientNameEl.value = "";
  mainIngredientAmountEl.value = "";
  renderInventory();
}

function removeInventory(index) {
  const inventory = loadInventory();
  inventory.splice(index, 1);
  saveInventory(inventory);
  renderInventory();
}

function clearInventory() {
  if (!confirm("모든 주재료 보유 정보를 삭제하시겠습니까?")) return;
  localStorage.removeItem(inventoryKey);
  renderInventory();
}

function populateIngredientOptions() {
  ingredientSelect.innerHTML = "<option value=\"\">주재료를 선택하세요</option>";
  ingredientSuggestions.innerHTML = "";
  ingredientOptions.forEach((item) => {
    const selectOption = document.createElement("option");
    selectOption.value = item;
    selectOption.textContent = item;
    ingredientSelect.appendChild(selectOption);

    const listOption = document.createElement("option");
    listOption.value = item;
    ingredientSuggestions.appendChild(listOption);
  });
}

function filterIngredientSelection(query) {
  const normalizedQuery = normalizeText(query);
  const filtered = ingredientOptions.filter((item) => normalizeText(item).includes(normalizedQuery));
  if (filtered.length === 0) {
    ingredientSelect.innerHTML = "<option value=\"\">검색 결과 없음 — 그대로 입력해 AI 생성을 이용하세요</option>";
    return;
  }
  ingredientSelect.innerHTML = "<option value=\"\">주재료를 선택하세요</option>";
  filtered.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    ingredientSelect.appendChild(option);
  });
}

function getRecipeCandidates(cuisine, spices, maxCount = 3) {
  const cuisineRecipes = recipes[cuisine] || {};
  return Object.entries(cuisineRecipes)
    .map(([ingredient, recipe]) => {
      const { score, matchedSpices } = computeRecipeMatchScore(recipe, spices);
      return { ingredient, recipe, cuisine, score, matchedSpices };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, maxCount);
}

function showCandidateRecommendations(candidates) {
  if (!candidates || candidates.length === 0) return "";
  const items = candidates
    .map((candidate) => {
      const label = `${escapeHtml(candidate.recipe.title)} (${escapeHtml(candidate.ingredient)})`;
      const percent = candidate.score > 0 ? Math.round((candidate.score / candidate.recipe.ingredients.length) * 100) : 0;
      return `<li><strong>${label}</strong> — 보유 향신료 적합도 ${percent}%</li>`;
    })
    .join("");
  return `<div><strong>참고: 추가로 잘 맞는 추천 레시피</strong><ul class="metric-list">${items}</ul></div>`;
}

function showPhotoPreview(file) {
  photoPreview.innerHTML = "";
  if (!file) {
    photoPreview.textContent = "사진이 없습니다.";
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const img = document.createElement("img");
    img.src = reader.result;
    img.alt = "업로드된 식재료 사진";
    photoPreview.appendChild(img);
  };
  reader.readAsDataURL(file);
}

function findRecipe(mainIngredient, cuisine) {
  const cuisineRecipes = recipes[cuisine] || {};
  return cuisineRecipes[mainIngredient] || null;
}

function normalizeText(text) {
  return String(text).replace(/\s+/g, "").toLowerCase();
}

function detectIngredientsFromFileName(filename) {
  const lower = filename.toLowerCase();
  return ingredientOptions.filter((item) => lower.includes(item));
}

function computeRecipeMatchScore(recipe, spices) {
  const matchCount = spices.reduce((count, item) => {
    const matched = recipe.ingredients.some((ingredientLine) => ingredientLineIncludes(item.name, ingredientLine));
    return count + (matched ? 1 : 0);
  }, 0);
  return {
    score: matchCount,
    total: recipe.ingredients.length,
    matchedSpices: spices.filter((item) => recipe.ingredients.some((ingredientLine) => ingredientLineIncludes(item.name, ingredientLine)))
  };
}

function parseInventoryAmount(amountText) {
  const normalized = String(amountText).trim();
  const match = normalized.match(/([0-9]+(?:\.[0-9]+)?)(?:\s*(g|ml|kg|l))?\b/i);
  if (!match) return null;
  const value = parseFloat(match[1]);
  const unit = match[2] ? match[2].toLowerCase() : "g";
  return { value, unit };
}

function convertToBaseUnit(parsed) {
  if (!parsed) return null;
  if (parsed.unit === "kg") return { value: parsed.value * 1000, unit: "g" };
  if (parsed.unit === "l") return { value: parsed.value * 1000, unit: "ml" };
  return { value: parsed.value, unit: parsed.unit };
}

function getIngredientName(line) {
  return String(line).split(" ")[0];
}

function findMatchingSpiceForLine(line, spices) {
  return spices.find((item) => ingredientLineIncludes(item.name, line) || ingredientLineIncludes(getIngredientName(line), item.name));
}

function checkSpiceAvailability(ingredientLines, spices) {
  const available = [];
  const insufficient = [];
  const missing = [];

  ingredientLines.forEach((line) => {
    const name = getIngredientName(line);
    const parsedRecipe = parseAmountLine(line);
    const matchedSpice = findMatchingSpiceForLine(line, spices);

    if (!matchedSpice) {
      if (parsedRecipe) missing.push(name);
      return;
    }
    const inventoryParsed = parseInventoryAmount(matchedSpice.amount);
    if (!parsedRecipe || !inventoryParsed) {
      available.push(matchedSpice.name);
      return;
    }

    const recipeAmount = convertToBaseUnit(parsedRecipe);
    const inventoryAmount = convertToBaseUnit(inventoryParsed);
    if (!recipeAmount || !inventoryAmount) {
      available.push(matchedSpice.name);
      return;
    }

    if (recipeAmount.unit === inventoryAmount.unit) {
      if (inventoryAmount.value >= recipeAmount.value) {
        available.push(matchedSpice.name);
      } else {
        insufficient.push({
          name: matchedSpice.name,
          need: `${formatScaledValue(recipeAmount.value)}${recipeAmount.unit}`,
          have: `${formatScaledValue(inventoryAmount.value)}${inventoryAmount.unit}`
        });
      }
    } else {
      available.push(matchedSpice.name);
    }
  });

  return {
    available: Array.from(new Set(available)),
    insufficient,
    missing: Array.from(new Set(missing))
  };
}

function findBestRecipe(mainIngredient, cuisine, spices) {
  const inventory = loadInventory();
  const exactRecipe = findRecipe(mainIngredient, cuisine);
  if (exactRecipe) {
    return { recipe: exactRecipe, cuisine, exactMatch: true };
  }

  const alternateSameIngredient = Object.entries(recipes).reduce((acc, [nextCuisine, items]) => {
    const recipe = items[mainIngredient];
    if (recipe) acc.push({ recipe, cuisine: nextCuisine });
    return acc;
  }, []);

  if (alternateSameIngredient.length > 0) {
    return { recipe: alternateSameIngredient[0].recipe, cuisine: alternateSameIngredient[0].cuisine, exactMatch: false, fallbackType: "sameIngredient" };
  }

  const candidates = Object.entries(recipes[cuisine] || {}).map(([ingredient, recipe]) => {
    const score = computeRecipeMatchScore(recipe, spices).score;
    return { ingredient, recipe, cuisine, score };
  });

  if (candidates.length === 0) {
    return null;
  }

  candidates.sort((a, b) => b.score - a.score);
  return { recipe: candidates[0].recipe, cuisine, exactMatch: false, fallbackType: "spiceMatch", score: candidates[0].score };
}

function parseAmountLine(line) {
  const match = line.match(/([0-9]+(?:\.[0-9]+)?)\s*(g|ml|kg|l)\b/i);
  if (!match) return null;
  return {
    original: match[0],
    value: parseFloat(match[1]),
    unit: match[2].toLowerCase(),
    start: match.index,
    end: match.index + match[0].length
  };
}

function getMainIngredientStockStatus(mainIngredient, targetWeight, recipe) {
  const inventory = loadInventory();
  const item = inventory.find((entry) => normalizeText(entry.name) === normalizeText(mainIngredient));
  const recipeAmount = targetWeight > 0 ? { value: targetWeight, unit: "g" } : parseAmountLine(recipe.ingredients[0]);
  if (!item) {
    return { message: `${mainIngredient} 보유 정보가 없습니다.` };
  }
  const inventoryParsed = convertToBaseUnit(parseInventoryAmount(item.amount));
  const requiredParsed = targetWeight > 0 ? { value: targetWeight, unit: "g" } : convertToBaseUnit(recipeAmount);
  if (!requiredParsed || !inventoryParsed) {
    return { message: `${item.name} ${item.amount} 보유 중입니다.` };
  }
  if (inventoryParsed.unit !== requiredParsed.unit) {
    return { message: `${item.name} ${item.amount} 보유 중입니다.` };
  }
  if (inventoryParsed.value >= requiredParsed.value) {
    return { message: `${item.name} ${formatScaledValue(inventoryParsed.value)}${inventoryParsed.unit} 보유 중이며 충분합니다.` };
  }
  return { message: `${item.name} ${formatScaledValue(inventoryParsed.value)}${inventoryParsed.unit} 보유 중이며, 필요한 ${formatScaledValue(requiredParsed.value)}${requiredParsed.unit}보다 부족합니다.` };
}

function formatScaledValue(value) {
  return value % 1 === 0 ? String(value) : value.toFixed(1);
}

function scaleIngredientLine(line, factor) {
  const amount = parseAmountLine(line);
  if (!amount) return line;
  const scaled = amount.value * factor;
  const scaledValue = formatScaledValue(scaled);
  return line.slice(0, amount.start) + `${scaledValue}${amount.unit}` + line.slice(amount.end);
}

function scaleRecipeIngredients(recipe, targetWeight) {
  const firstLineAmount = parseAmountLine(recipe.ingredients[0]);
  if (!firstLineAmount) return recipe.ingredients;

  let baseWeight = firstLineAmount.value;
  if (firstLineAmount.unit === "kg") baseWeight *= 1000;
  else if (firstLineAmount.unit === "l") baseWeight *= 1000;

  if (!targetWeight || baseWeight === 0) return recipe.ingredients;

  const factor = targetWeight / baseWeight;
  if (factor === 1) return recipe.ingredients;

  return recipe.ingredients.map((line) => scaleIngredientLine(line, factor));
}

function getScaledRecipeLines(recipe, targetWeight) {
  const scaled = scaleRecipeIngredients(recipe, targetWeight);
  if (scaled === recipe.ingredients) return recipe.ingredients;
  return scaled;
}

function getInventoryRecipeScore(recipe, spices, inventory) {
  const recipeIngredient = getIngredientName(recipe.ingredients[0]);
  const inventoryMatch = inventory.some((item) => normalizeText(item.name) === normalizeText(recipeIngredient));
  const spiceScore = computeRecipeMatchScore(recipe, spices).score;
  const ingredientScore = inventoryMatch ? 4 : 0;
  return {
    score: ingredientScore + spiceScore,
    spiceScore,
    inventoryMatch,
    ingredient: recipeIngredient
  };
}

async function generateRecipeWithClaude() {
  const showMessage = (html) => {
    recommendationEl.innerHTML = html;
    recommendationEl.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const key = loadApiKey();
  if (!key) {
    showMessage("<p>AI 레시피 생성은 Claude API 키가 필요합니다. 상단 '0. Claude API 키 설정'에서 키를 입력해주세요.</p>");
    return;
  }
  const ingredient = (ingredientSelect.value || ingredientSearchEl.value || "").trim();
  const cuisine = cuisineSelect.value;
  const targetWeight = Number(targetWeightEl.value);
  if (!ingredient) {
    showMessage("<p>주재료를 선택하거나 입력한 뒤 생성받기를 눌러주세요.</p>");
    return;
  }
  if (!cuisine) {
    showMessage("<p>요리 유형(한식/중식/양식)을 선택한 뒤 생성받기를 눌러주세요.</p>");
    return;
  }

  const spices = loadSpices();
  const spiceText = spices.length > 0
    ? spices.map((s) => `${s.name} ${s.amount}`).join(", ")
    : "(보유한 조미료 없음)";
  const weightText = targetWeight > 0 ? `주재료 약 ${targetWeight}g 기준` : "1~2인분 기준";

  recommendationEl.innerHTML = "<p>✨ Claude가 레시피를 생성 중입니다... 잠시만 기다려주세요.</p>";
  recommendationEl.scrollIntoView({ behavior: "smooth", block: "start" });
  generateRecipeBtn.disabled = true;

  const prompt =
    `다음 조건으로 ${cuisineLabel(cuisine)} 레시피 1개를 만들어주세요.\n` +
    `- 주재료: ${ingredient} (${weightText})\n` +
    `- 보유 조미료(가능하면 활용): ${spiceText}\n` +
    (lastPhotoFile ? `- 첨부된 사진은 보유한 재료 사진입니다. 사진 속 재료의 양과 상태(손질 여부 등)를 참고하세요.\n` : "") +
    `- 모든 재료의 분량은 반드시 미터법(g, ml)으로 표기. 개수 단위 금지(예: '대파 1대' 금지 → '대파 50g').\n` +
    `- 보유 조미료를 우선 사용하고, 추가로 필요한 조미료가 있으면 포함하세요.\n` +
    `다른 설명 없이 아래 JSON 형식으로만 답하세요:\n` +
    `{"title":"요리 이름","description":"한 줄 설명","ingredients":["재료 분량(g/ml)", ...],"steps":["조리 단계", ...]}`;

  try {
    const userContent = [];
    if (lastPhotoFile) {
      try {
        const { data, mediaType } = await fileToResizedBase64(lastPhotoFile);
        userContent.push({ type: "image", source: { type: "base64", media_type: mediaType, data } });
      } catch (e) {
        // 사진 변환에 실패해도 텍스트만으로 레시피 생성을 계속한다.
      }
    }
    userContent.push({ type: "text", text: prompt });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 1024,
        system: "당신은 요리 전문가입니다. 요청받은 형식의 JSON으로만 답합니다.",
        messages: [
          { role: "user", content: userContent },
          { role: "assistant", content: [{ type: "text", text: '{"title":' }] }
        ]
      })
    });

    if (!response.ok) {
      let message = `HTTP ${response.status}`;
      try {
        const err = await response.json();
        if (err && err.error && err.error.message) message = err.error.message;
      } catch (e) {
        // ignore
      }
      recommendationEl.innerHTML = `<p>레시피 생성 실패: ${escapeHtml(message)}</p>`;
      return;
    }

    const result = await response.json();
    const textBlock = (result.content || []).find((b) => b.type === "text");
    // assistant 프리필('{"title":')로 시작을 강제했으므로 응답 앞에 다시 붙여서 파싱한다.
    const text = '{"title":' + (textBlock ? textBlock.text : "");
    let recipe = null;
    try {
      const match = text.match(/\{[\s\S]*\}/);
      if (match) recipe = JSON.parse(match[0]);
    } catch (e) {
      recipe = null;
    }

    if (!recipe || !recipe.title || !Array.isArray(recipe.ingredients) || !Array.isArray(recipe.steps)) {
      recommendationEl.innerHTML = `<p>레시피를 해석하지 못했습니다. 다시 시도해주세요.</p>`;
      return;
    }

    recommendationEl.innerHTML = `
      <h3>${escapeHtml(recipe.title)} <span class="ai-badge">AI 생성</span></h3>
      <p>${escapeHtml(recipe.description || "")}</p>
      <p><a href="${youtubeSearchUrl(recipe.title)}" target="_blank" rel="noopener" class="yt-link">▶ 유튜브에서 이 요리 영상 보기</a></p>
      <strong>레시피 재료 (미터법 기준):</strong>
      <ul class="metric-list">${recipe.ingredients.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>
      <strong>요리 단계:</strong>
      <ol>${recipe.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
      <p class="metric-note">※ Claude AI가 생성한 레시피입니다. 분량/맛은 기호에 맞게 조정하세요.</p>
    `;
  } catch (e) {
    recommendationEl.innerHTML = `<p>레시피 생성 중 오류가 발생했습니다: ${escapeHtml(e.message)}</p>`;
  } finally {
    generateRecipeBtn.disabled = false;
  }
}

function youtubeSearchUrl(title) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(title + " 레시피 만드는법")}`;
}

function cuisineLabel(cuisine) {
  return cuisine === "korean" ? "한식" : cuisine === "chinese" ? "중식" : "양식";
}

function openRecipeDetail(ingredient, cuisine) {
  cuisineSelect.value = cuisine;
  const hasOption = Array.from(ingredientSelect.options).some((o) => o.value === ingredient);
  if (!hasOption) {
    const opt = document.createElement("option");
    opt.value = ingredient;
    opt.textContent = ingredient;
    ingredientSelect.appendChild(opt);
  }
  ingredientSelect.value = ingredient;
  renderRecommendation();
  recommendationEl.scrollIntoView({ behavior: "smooth", block: "start" });
}

function recommendByInventory() {
  const spices = loadSpices();
  const inventory = loadInventory();
  if (inventory.length === 0 && spices.length === 0) {
    recommendationEl.innerHTML = "<p>보유한 양념과 주재료를 먼저 기록해주세요.</p>";
    return;
  }

  const candidates = [];
  Object.entries(recipes).forEach(([cuisine, list]) => {
    Object.entries(list).forEach(([ingredient, recipe]) => {
      const score = getInventoryRecipeScore(recipe, spices, inventory);
      candidates.push({ cuisine, ingredient, recipe, ...score });
    });
  });

  candidates.sort((a, b) => b.score - a.score || b.spiceScore - a.spiceScore);

  const top = candidates.slice(0, 5);
  if (top.length === 0 || top[0].score === 0) {
    recommendationEl.innerHTML = "<p>보유 재료와 어울리는 레시피를 찾지 못했습니다. 재료를 더 추가해보세요.</p>";
    return;
  }

  recommendationEl.innerHTML = `
    <h3>내 보유 재료 기반 추천 레시피</h3>
    <ul class="metric-list">
      ${top
        .map(
          (item) =>
            `<li><a href="#" class="recipe-link" data-cuisine="${escapeHtml(item.cuisine)}" data-ingredient="${escapeHtml(item.ingredient)}"><strong>${escapeHtml(item.recipe.title)}</strong></a> (${cuisineLabel(item.cuisine)}) — 점수 ${item.score} (${item.inventoryMatch ? "주재료 보유" : "주재료 미보유"}, 양념 점수 ${item.spiceScore}) <a href="${youtubeSearchUrl(item.recipe.title)}" target="_blank" rel="noopener" class="yt-link">▶ 유튜브</a></li>`
        )
        .join("")}
    </ul>
    <p>레시피 제목을 클릭하면 상세 레시피가 표시됩니다. ▶ 유튜브를 누르면 영상으로 볼 수 있어요.</p>
  `;
}

function renderRecommendation() {
  recommendationEl.innerHTML = "";
  const ingredient = ingredientSelect.value;
  const cuisine = cuisineSelect.value;
  const targetWeight = Number(targetWeightEl.value);
  const spices = loadSpices();

  if (!ingredient || !cuisine) {
    recommendationEl.innerHTML = "<p>주재료와 요리 유형을 선택한 뒤 추천받기를 눌러주세요.</p>";
    return;
  }

  const best = findBestRecipe(ingredient, cuisine, spices);
  if (!best || !best.recipe) {
    recommendationEl.innerHTML = `<p>선택한 재료에 대한 ${cuisineLabel(cuisine)} 내장 레시피가 없습니다. '✨ AI 레시피 생성받기' 버튼을 누르면 ${escapeHtml(ingredient)} 레시피를 만들어드려요.</p>`;
    return;
  }

  if (!best.exactMatch && !hasBuiltinRecipe(ingredient)) {
    recommendationEl.innerHTML = `<p>'${escapeHtml(ingredient)}'에 대한 내장 레시피가 없습니다. '✨ AI 레시피 생성받기' 버튼을 누르면 ${cuisineLabel(cuisine)} 레시피를 만들어드려요.</p>`;
    return;
  }

  const recipe = best.recipe;
  const scaledIngredients = getScaledRecipeLines(recipe, targetWeight);
  const availability = checkSpiceAvailability(scaledIngredients, spices);
  const matchedSpices = spices.filter((item) => scaledIngredients.some((ingredientLine) => ingredientLineIncludes(item.name, ingredientLine)));
  const inventoryStatus = getMainIngredientStockStatus(ingredient, targetWeight, recipe);

  const commonSpices = spices.map((item) => `${escapeHtml(item.name)} (${escapeHtml(item.amount)})`).join(" · ") || "등록된 조미료가 없습니다.";
  const scaleNote = targetWeight > 0 ? `<p class="metric-note">${escapeHtml(ingredient)} ${targetWeight}g 기준으로 재료 양을 비율에 맞춰 조정했습니다.</p>` : "";
  const inventoryNote = inventoryStatus ? `<p class="metric-note">주재료 보유 상태: ${escapeHtml(inventoryStatus.message)}</p>` : "";

  let fallbackMessage = "";
  if (!best.exactMatch) {
    if (best.fallbackType === "sameIngredient") {
      fallbackMessage = `<p>선택한 요리 유형에 대한 레시피는 없지만, '${cuisineLabel(best.cuisine)}' 스타일의 ${escapeHtml(ingredient)} 레시피를 추천합니다.</p>`;
    } else if (best.fallbackType === "spiceMatch") {
      fallbackMessage = `<p>선택한 요리 유형에서 보유한 조미료와 가장 잘 맞는 레시피를 추천합니다.</p>`;
    }
  }

  const topCandidates = getRecipeCandidates(cuisine, spices, 3);
  const extraRecommendations = topCandidates.length > 0 ? showCandidateRecommendations(topCandidates.filter((item) => item.recipe.title !== recipe.title)) : "";

  recommendationEl.innerHTML = `
    <h3>${escapeHtml(recipe.title)}</h3>
    <p>${escapeHtml(recipe.description)}</p>
    <p><a href="${youtubeSearchUrl(recipe.title)}" target="_blank" rel="noopener" class="yt-link">▶ 유튜브에서 이 요리 영상 보기</a></p>
    <p class="metric-note">※ 레시피는 앱이 제공하는 예시 데이터입니다. 실제 조리 영상은 위 유튜브 링크에서 확인하세요.</p>
    ${fallbackMessage}
    ${scaleNote}
    ${inventoryNote}
    <strong>사용 가능한 보유 조미료:</strong>
    <p>${commonSpices}</p>
    <strong>레시피 재료 (미터법 기준):</strong>
    <ul class="metric-list">${scaledIngredients.map((line) => `<li>${line}</li>`).join("")}</ul>
    <strong>요리 단계:</strong>
    <ol>${recipe.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
    ${extraRecommendations}
  `;

  if (matchedSpices.length > 0) {
    const matchedList = matchedSpices.map((item) => `${escapeHtml(item.name)} (${escapeHtml(item.amount)})`).join(" · ");
    recommendationEl.innerHTML += `<p><strong>추천: 보유한 향신료가 포함되었습니다.</strong><br>${matchedList}</p>`;
  }

  if (availability.insufficient.length > 0) {
    const insuffList = availability.insufficient
      .map((item) => `${escapeHtml(item.name)} (필요 ${escapeHtml(item.need)}, 보유 ${escapeHtml(item.have)})`)
      .join(" · ");
    recommendationEl.innerHTML += `<p><strong>부족한 조미료:</strong> ${insuffList}</p>`;
  }

  if (availability.missing.length > 0) {
    recommendationEl.innerHTML += `<p><strong>추가로 필요한 조미료:</strong> ${availability.missing.map(escapeHtml).join(", ")}</p>`;
  }
}

function ingredientLineIncludes(name, line) {
  const normalizedName = name.replace(/\s+/g, "").toLowerCase();
  const normalizedLine = line.replace(/\s+/g, "").toLowerCase();
  return normalizedLine.includes(normalizedName);
}

function loadApiKey() {
  return localStorage.getItem(apiKeyStorageKey) || "";
}

function renderApiKeyStatus() {
  const key = loadApiKey();
  if (key) {
    apiKeyEl.value = key;
    apiKeyStatusEl.textContent = "✅ API 키가 저장되어 있습니다. 사진을 업로드하면 자동 인식됩니다.";
  } else {
    apiKeyStatusEl.textContent = "⚠️ API 키가 없습니다. 키 없이도 수동 선택은 가능하지만, 사진 자동 인식은 키가 필요합니다.";
  }
}

function saveApiKey() {
  const key = apiKeyEl.value.trim();
  if (!key) {
    apiKeyStatusEl.textContent = "키를 입력해주세요.";
    return;
  }
  localStorage.setItem(apiKeyStorageKey, key);
  renderApiKeyStatus();
}

function clearApiKey() {
  localStorage.removeItem(apiKeyStorageKey);
  apiKeyEl.value = "";
  renderApiKeyStatus();
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const base64 = String(result).split(",")[1];
      resolve({ data: base64, mediaType: file.type || "image/jpeg" });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// 스마트폰 원본 사진은 API 이미지 크기 제한(약 5MB)을 넘기 쉬워 긴 변 1024px로 줄여서 전송한다.
const MAX_IMAGE_DIMENSION = 1024;

function fileToResizedBase64(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      const longest = Math.max(img.width, img.height);
      const scale = longest > MAX_IMAGE_DIMENSION ? MAX_IMAGE_DIMENSION / longest : 1;
      if (scale === 1 && file.size < 1024 * 1024) {
        fileToBase64(file).then(resolve, reject);
        return;
      }
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      resolve({ data: dataUrl.split(",")[1], mediaType: "image/jpeg" });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      fileToBase64(file).then(resolve, reject);
    };
    img.src = url;
  });
}

async function detectIngredientsWithClaude(file) {
  const key = loadApiKey();
  if (!key) {
    return { ok: false, reason: "no-key" };
  }
  const { data, mediaType } = await fileToResizedBase64(file);
  const prompt =
    "이 사진에 보이는 '요리 주재료'(채소, 육류, 해산물, 두부 등)를 한국어 이름으로만 식별해줘. " +
    "양념이나 향신료는 제외하고, 주재료만 쉼표로 구분된 JSON 배열로 답해줘. " +
    '예: ["닭가슴살", "양파", "감자"]. 다른 설명 없이 JSON 배열만 출력해.';

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: 256,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mediaType, data } },
            { type: "text", text: prompt }
          ]
        }
      ]
    })
  });

  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const err = await response.json();
      if (err && err.error && err.error.message) message = err.error.message;
    } catch (e) {
      // ignore parse error
    }
    return { ok: false, reason: "api-error", message };
  }

  const result = await response.json();
  const textBlock = (result.content || []).find((b) => b.type === "text");
  const text = textBlock ? textBlock.text : "";
  let ingredients = [];
  try {
    const match = text.match(/\[[\s\S]*\]/);
    if (match) ingredients = JSON.parse(match[0]);
  } catch (e) {
    ingredients = [];
  }
  ingredients = ingredients.filter((x) => typeof x === "string" && x.trim()).map((x) => x.trim());
  return { ok: true, ingredients };
}

function fillIngredientSelect(options) {
  ingredientSelect.innerHTML = "<option value=\"\">주재료를 선택하세요</option>";
  options.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    ingredientSelect.appendChild(option);
  });
}

addSpiceBtn.addEventListener("click", addSpice);
addInventoryBtn.addEventListener("click", addInventory);
clearSpicesBtn.addEventListener("click", clearSpices);
clearInventoryBtn.addEventListener("click", clearInventory);
spiceListEl.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const [type, index] = button.dataset.index.split("-");
  if (type === "spice") {
    removeSpice(Number(index));
  } else if (type === "inv") {
    removeInventory(Number(index));
  }
});
function handleAmountEdit(event) {
  const input = event.target.closest("input.amount-input");
  if (!input) return;
  const [type, index] = input.dataset.edit.split("-");
  if (type === "spice") {
    updateSpiceAmount(Number(index), input.value);
  } else if (type === "inv") {
    updateInventoryAmount(Number(index), input.value);
  }
}
inventoryListEl.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  const [type, index] = button.dataset.index.split("-");
  if (type === "inv") {
    removeInventory(Number(index));
  }
});
spiceListEl.addEventListener("change", handleAmountEdit);
inventoryListEl.addEventListener("change", handleAmountEdit);
ingredientSearchEl.addEventListener("input", (event) => {
  const value = event.target.value.trim();
  if (!value) {
    populateIngredientOptions();
    return;
  }
  filterIngredientSelection(value);
  if (ingredientOptions.some((item) => normalizeText(item) === normalizeText(value))) {
    ingredientSelect.value = value;
  }
});
function hasBuiltinRecipe(ingredient) {
  return Object.values(recipes).some((list) => Boolean(list[ingredient]));
}

photoInput.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  lastPhotoFile = file || null;
  showPhotoPreview(file);
  if (!file) {
    photoHintEl.textContent = "사진을 업로드하면 해당 재료를 자동으로 추천합니다.";
    return;
  }
  recommendationEl.innerHTML = "";

  if (loadApiKey()) {
    photoHintEl.textContent = "🔍 Claude AI가 사진 속 재료를 분석 중입니다...";
    try {
      const detection = await detectIngredientsWithClaude(file);
      if (detection.ok && detection.ingredients.length > 0) {
        fillIngredientSelect(detection.ingredients);
        const noBuiltin = detection.ingredients.every((item) => !hasBuiltinRecipe(item));
        photoHintEl.textContent = `사진에서 ${detection.ingredients.join(" / ")}를(을) 인식했습니다. 주재료를 선택하세요.` +
          (noBuiltin ? " 내장 레시피에 없는 재료이니 '✨ AI 레시피 생성받기'를 이용해보세요." : "");
        return;
      }
      if (detection.ok) {
        photoHintEl.textContent = "사진에서 주재료를 찾지 못했습니다. 아래에서 직접 선택해주세요.";
      } else if (detection.reason === "api-error") {
        photoHintEl.textContent = `AI 분석 실패: ${detection.message}. 아래에서 직접 선택해주세요.`;
      }
    } catch (e) {
      photoHintEl.textContent = `AI 분석 중 오류가 발생했습니다 (${e.message}). 아래에서 직접 선택해주세요.`;
    }
  }

  // API 키가 없거나 인식 실패 시: 파일명 기반 추측 + 기본 후보
  const detectedIngredients = detectIngredientsFromFileName(file.name);
  const options = detectedIngredients.length > 0 ? detectedIngredients : ["닭가슴살", "두부", "양파", "감자", "버섯"];
  fillIngredientSelect(options);
  if (!loadApiKey()) {
    photoHintEl.textContent = "API 키를 입력하면 사진 속 재료를 자동 인식합니다. 지금은 아래에서 직접 선택해주세요.";
  }
});

saveApiKeyBtn.addEventListener("click", saveApiKey);
clearApiKeyBtn.addEventListener("click", clearApiKey);
renderApiKeyStatus();
recommendationEl.addEventListener("click", (event) => {
  const link = event.target.closest(".recipe-link");
  if (!link) return;
  event.preventDefault();
  openRecipeDetail(link.dataset.ingredient, link.dataset.cuisine);
});
recommendBtn.addEventListener("click", renderRecommendation);
generateRecipeBtn.addEventListener("click", generateRecipeWithClaude);
recommendInventoryBtn.addEventListener("click", recommendByInventory);

populateIngredientOptions();
renderSpices();
renderInventory();
showPhotoPreview(null);
