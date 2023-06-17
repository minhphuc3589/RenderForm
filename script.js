arrConditions = []
arrChangedConditions = []
arrText = []
arrNameGender = []

iConditions = 0
iNameGender = 1

window.addEventListener("load", () => {
  percent = document.getElementById("percent")
  percent.value = "100"
  
})

const handleNameGender = () => {
  nameGenderInput = document.getElementById("name-gender-input")
  addNameGender = document.getElementById("add-name-gender")

  arrNameGender.push(nameGenderInput.value)

  text = document.createTextNode("Lv " + iNameGender.toString() + ": " + arrNameGender[iNameGender - 1])
  div = document.createElement("div")
  br = document.createElement("br")

  div.setAttribute("id", "name-gender-" + iNameGender.toString())

  div.appendChild(text)
  div.appendChild(br)
  addNameGender.appendChild(div)

  iNameGender += 1
}

const deleteNameGender = () => {
  addNameGender = document.getElementById("add-name-gender")
  lastNameGender = document.getElementById("name-gender-" + (iNameGender - 1).toString())

  if (arrNameGender.length > 0) {
    arrNameGender.pop()
    lastNameGender.remove()

    iNameGender -= 1
  }
}

const handleConditions = () => {
  condition = document.getElementById("condition")
  changedCondition = document.getElementById("changed-condition")
  listConditions = document.getElementById("add-condition-text")
  percent = document.getElementById("percent")

  arrConditions.push(condition.value)
  arrChangedConditions.push(changedCondition.value)

  // Trùng điều kiện
  for (var i = 0; i < arrConditions.length - 1; i++) {
    if (arrConditions[i] === arrConditions[arrConditions.length - 1]) {
      arrConditions.pop()
      arrChangedConditions.pop()

      alert("Dữ liệu cần thay đổi đã bị trùng")
    }
  }

  if (i <= arrConditions.length - 1) {
    text = document.createTextNode(arrConditions[iConditions] + " ➨ " + arrChangedConditions[iConditions])
    div = document.createElement("div")
    br = document.createElement("br")

    div.setAttribute("id", "condition-" + iConditions.toString())

    div.appendChild(text)
    div.appendChild(br)
    listConditions.appendChild(div)

    iConditions += 1

  }
}

const DeQuy = (condition, value, count) => {
  percent = document.getElementById("percent")

  if (count > arrText.length) return 0;
  else {
    arrText[count - 1] = arrText[count - 1].replace(condition, value.toFixed(1))

    value = value + value*(percent.value/100)

    DeQuy(condition, value, count + 1)
  }

}

const render = () => {
  text = document.getElementById("text-input")
  result = document.getElementById("text-result")

  var count = 1
  arrText = []
  result.value = ""

  if (arrText.length < 101) {
    for (var i = 0; i < 101; i++) {
      arrText.push(text.value)
    }
  }

  for (var i = 0; i < arrConditions.length; i++) {

    // KEY WORD //
    switch (arrConditions[i]) {
      case "lvup":
        for (var j = 0; j < arrText.length; j++) {
          arrText[j] = arrText[j].replace(arrConditions[i], (j + 1))
        }
        break

      case "name_gender":
        for (var j = 0; j < arrText.length; j++) {
          if (j >= arrNameGender.length) arrText[j] = arrText[j].replace(arrConditions[i], (j + 1))
          else arrText[j] = arrText[j].replace(arrConditions[i], arrNameGender[j])
        }
        break

      default:
        for (var j = 0; j < arrText.length; j++) {
          arrText[j] = arrText[j].replace(arrConditions[i], arrChangedConditions[i])
        }
        break
    }

    // CONDITIONS //
    var position = arrConditions[i].indexOf("\*lvup") + 4
    if (arrConditions[i][position] === "p") {
      for (var j = 0; j < arrText.length; j++) {
        arrText[j] = arrText[j].replace(arrConditions[i], parseFloat(arrChangedConditions[i]*(j + 1)))
      }
    } else if (typeof parseFloat(arrChangedConditions[i]) === "number") {
      DeQuy(arrConditions[i], parseFloat(arrChangedConditions[i]), count)
    }

  }

  for (var i = 0; i < arrText.length; i++) {
    result.value += arrText[i] + "\n\n"
  }
}
