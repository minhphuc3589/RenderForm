arrConditions = []
arrChangedConditions = []
arrText = []
arrNameGender = []

iConditions = 0
iNameGender = 1

window.addEventListener("load", () => {
  document.getElementById("percent").value = "100"
  document.getElementById("lv-start").value = "1"
  document.getElementById("lv-end").value = "101"
  
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


const render = () => {
  text = document.getElementById("text-input")
  result = document.getElementById("text-result")
  levelStart = parseInt(document.getElementById("lv-start").value, 16)
  levelEnd = parseInt(document.getElementById("lv-end").value, 16)
  percent = document.getElementById("percent")

  arrText = []
  result.value = ""

  if (arrText.length < levelEnd) {
    for (var i = 0; i < Math.abs(levelEnd - levelStart) + 1; i++) {
      arrText.push(text.value)
    }
  }

  for (var i = 0; i < arrConditions.length; i++) {
    var position = arrConditions[i].indexOf("\*lvup") + 4

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

      case "def_lvup":
        for (var j = 0; j < arrText.length; j++) {
          arrText[j] = arrText[j].replace(arrConditions[i], levelStart)
          levelStart += 1
        }
        break

      default:
        if (arrConditions[i][position] === "p") {
          for (var j = 0; j < arrText.length; j++) {
            arrText[j] = arrText[j].replace(arrConditions[i], parseFloat(arrChangedConditions[i]*(j + 1)))
          }
        } else if (typeof arrConditions[i] === "string" && typeof parseFloat(arrChangedConditions[i]) === "number") {
          for (var j = levelStart; j < arrText.length; j++) {
            arrText[j] = arrText[j].replace(arrConditions[i], parseFloat(arrChangedConditions[i])*Math.pow((1 + parseFloat(percent.value)/100), j))
          }
        } else {
          for (var j = 0; j < arrText.length; j++) {
            arrText[j] = arrText[j].replace(arrConditions[i], arrChangedConditions[i])
          }
        }
        break
    }
  }

  for (var i = 0; i < arrText.length; i++) {
    result.value += arrText[i] + "\n\n"
  }
}
