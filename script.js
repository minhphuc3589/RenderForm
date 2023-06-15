arrConditions = []
arrChangedConditions = []
iConditions = 0
arrText = []

window.addEventListener("load", () => {
  percent = document.getElementById("percent")
  percent.value = "100"
  
})

const handleConditions = () => {
  condition = document.getElementById("condition")
  changedCondition = document.getElementById("changed-condition")
  listConditions = document.getElementById("add-condition-text")
  percent = document.getElementById("percent")

  arrConditions.push(condition.value)
  arrChangedConditions.push(changedCondition.value)

  for (var i = 0; i < arrConditions.length - 1; i++) {
    if (arrConditions[i] === arrConditions[arrConditions.length - 1]) {
      arrConditions.pop()
      arrChangedConditions.pop()

      alert("Dữ liệu cần thay đổi đã bị trùng")
    }
  }

  if (i <= arrConditions.length - 1) {
    text = document.createTextNode(arrConditions[iConditions] + " ➨ " + arrChangedConditions[iConditions])
    br = document.createElement("br")

    listConditions.appendChild(text)
    listConditions.appendChild(br)

    iConditions += 1

  }
}

const DeQuy = (condition, value, count) => {
  percent = document.getElementById("percent")

  if (count > arrText.length) return 0;
  else {
    arrText[count - 1] = arrText[count - 1].replace(condition, value)

    value = value + value

    DeQuy(condition, value, count + 1)
  }

}

const render = () => {
  text = document.getElementById("text-input")
  result = document.getElementById("text-result")

  var count = 1
  arrText = []

  if (arrText.length < 101) {
    for (var i = 0; i < 101; i++) {
      arrText.push(text.value)
    }
  }

  for (var i = 0; i < arrConditions.length; i++) {
    if (arrConditions[i] === "lvup") {
      for (var j = 0; j < arrText.length; j++) {
        arrText[j] = arrText[j].replace(arrConditions[i], (j + 1).toString())
      }
    }

    if (typeof parseFloat(arrChangedConditions[i]) === "number") {
      DeQuy(arrConditions[i], parseFloat(arrChangedConditions[i]), count)
    } else {
      for (var j = 0; j < arrText.length; j++) {
        arrText[j] = arrText[j].replace(arrConditions[i], arrChangedConditions[i])
      }
    }
  }

  for (var i = 0; i < arrText.length; i++) {
    result.value += arrText[i] + "\n\n"
  }
}
