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
        "양념장을 넣고 병아리콩 듯 조려서 완성한다."
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

function loadSpices() {
  const stored = localStorage.getItem(spicesKey);
  return stored ? JSON.parse(stored) : [];
}

function saveSpices(items) {
  localStorage.setItem(spicesKey, JSON.stringify(items));
}

function loadInventory() {
  const stored = localStorage.getItem(inventoryKey);
  return stored ? JSON.parse(stored) : [];
}

function saveInventory(items) {
  localStorage.setItem(inventoryKey, JSON.stringify(items));
}

function renderSpices() {
  const spices = loadSpices();
  spiceListEl.innerHTML = "";
  if (spices.length === 0) {
    spiceListEl.innerHTML = "<li>등록된 양념/향신료가 없습니다.</li>";
    return;
  }
  spices.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ${item.amount} <button data-index="spice-${index}">삭제</button>`;
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
    li.innerHTML = `${item.name} - ${item.amount} <button data-index="inv-${index}">삭제</button>`;
    inventoryListEl.appendChild(li);
  });
}

function addSpice() {
  const name = spiceNameEl.value.trim();
  const amount = spiceAmountEl.value.trim();
  if (!name || !amount) {
    alert("양념/향신료 이름과 수량을 모두 입력해주세요.");
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

function clearSpices() {
  if (!confirm("모든 양념/향신료 정보를 삭제하시겠습니까?")) return;
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
  if (filtered.length === 0) return;
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
      const label = `${candidate.recipe.title} (${candidate.ingredient})`;
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
    return { message: `${item.name} ${item.amount}g 보유 중입니다.` };
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
            `<li><strong>${item.recipe.title}</strong> (${item.cuisine === "korean" ? "한식" : item.cuisine === "chinese" ? "중식" : "양식"}) — 점수 ${item.score} (${item.inventoryMatch ? "주재료 보유" : "주재료 미보유"}, 양념 점수 ${item.spiceScore})</li>`
        )
        .join("")}
    </ul>
    <p>원하는 레시피 제목을 보고 주재료와 요리 유형을 선택하여 더 자세한 추천을 받아보세요.</p>
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
    recommendationEl.innerHTML = `<p>선택한 재료에 대한 ${cuisine === "korean" ? "한식" : cuisine === "chinese" ? "중식" : "양식"} 요리법이 준비 중입니다.</p>`;
    return;
  }

  const recipe = best.recipe;
  const scaledIngredients = getScaledRecipeLines(recipe, targetWeight);
  const availability = checkSpiceAvailability(scaledIngredients, spices);
  const matchedSpices = spices.filter((item) => scaledIngredients.some((ingredientLine) => ingredientLineIncludes(item.name, ingredientLine)));
  const inventoryStatus = getMainIngredientStockStatus(ingredient, targetWeight, recipe);

  const commonSpices = spices.map((item) => `${item.name} (${item.amount})`).join(" · ") || "등록된 양념/향신료가 없습니다.";
  const scaleNote = targetWeight > 0 ? `<p class="metric-note">${ingredient} ${targetWeight}g 기준으로 재료 양을 비율에 맞춰 조정했습니다.</p>` : "";
  const inventoryNote = inventoryStatus ? `<p class="metric-note">주재료 보유 상태: ${inventoryStatus.message}</p>` : "";

  let fallbackMessage = "";
  if (!best.exactMatch) {
    if (best.fallbackType === "sameIngredient") {
      fallbackMessage = `<p>선택한 요리 유형에 대한 레시피는 없지만, '${best.cuisine === "korean" ? "한식" : best.cuisine === "chinese" ? "중식" : "양식"}' 스타일의 ${ingredient} 레시피를 추천합니다.</p>`;
    } else if (best.fallbackType === "spiceMatch") {
      fallbackMessage = `<p>선택한 요리 유형에서 보유한 양념/향신료와 가장 잘 맞는 레시피를 추천합니다.</p>`;
    }
  }

  const topCandidates = getRecipeCandidates(cuisine, spices, 3);
  const extraRecommendations = topCandidates.length > 0 ? showCandidateRecommendations(topCandidates.filter((item) => item.recipe.title !== recipe.title)) : "";

  recommendationEl.innerHTML = `
    <h3>${recipe.title}</h3>
    <p>${recipe.description}</p>
    ${fallbackMessage}
    ${scaleNote}
    ${inventoryNote}
    <strong>사용 가능한 보유 양념/향신료:</strong>
    <p>${commonSpices}</p>
    <strong>레시피 재료 (미터법 기준):</strong>
    <ul class="metric-list">${scaledIngredients.map((line) => `<li>${line}</li>`).join("")}</ul>
    <strong>요리 단계:</strong>
    <ol>${recipe.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
    ${extraRecommendations}
  `;

  if (matchedSpices.length > 0) {
    const matchedList = matchedSpices.map((item) => `${item.name} (${item.amount})`).join(" · ");
    recommendationEl.innerHTML += `<p><strong>추천: 보유한 향신료가 포함되었습니다.</strong><br>${matchedList}</p>`;
  }

  if (availability.insufficient.length > 0) {
    const insuffList = availability.insufficient
      .map((item) => `${item.name} (필요 ${item.need}, 보유 ${item.have})`)
      .join(" · ");
    recommendationEl.innerHTML += `<p><strong>부족한 양념/향신료:</strong> ${insuffList}</p>`;
  }

  if (availability.missing.length > 0) {
    recommendationEl.innerHTML += `<p><strong>추가로 필요한 양념/향신료:</strong> ${availability.missing.join(", ")}</p>`;
  }
}

function ingredientLineIncludes(name, line) {
  const normalizedName = name.replace(/\s+/g, "").toLowerCase();
  const normalizedLine = line.replace(/\s+/g, "").toLowerCase();
  return normalizedLine.includes(normalizedName);
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
photoInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  showPhotoPreview(file);
  if (file) {
    const detectedIngredients = detectIngredientsFromFileName(file.name);
    const options = detectedIngredients.length > 0 ? detectedIngredients : ["닭가슴살", "두부", "양파", "감자", "버섯"];
    ingredientSelect.innerHTML = "<option value=\"\">주재료를 선택하세요</option>";
    options.forEach((item) => {
      const option = document.createElement("option");
      option.value = item;
      option.textContent = item;
      ingredientSelect.appendChild(option);
    });
    photoHintEl.textContent = detectedIngredients.length > 0
      ? `사진에서 ${detectedIngredients.join(" / ")}를(을) 감지했습니다. 필요하면 주재료를 선택하세요.`
      : "사진에서 재료를 자동으로 분석하지 못했습니다. 아래에서 주재료를 선택해주세요.";
    recommendationEl.innerHTML = "";
  } else {
    photoHintEl.textContent = "사진을 업로드하면 해당 재료를 자동으로 추천합니다.";
  }
});
recommendBtn.addEventListener("click", renderRecommendation);
recommendInventoryBtn.addEventListener("click", recommendByInventory);

populateIngredientOptions();
renderSpices();
renderInventory();
showPhotoPreview(null);
