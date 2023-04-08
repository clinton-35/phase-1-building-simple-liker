// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const hearts = document.querySelectorAll(".like-glyph");
console.log(hearts);

// Get the error modal element
const errorModal = document.getElementById("modal");

function likeHeart (event) {
  const heart = event.target;
  mimicServerCall()
  .then(function () {
    if(heart.innerText === EMPTY_HEART) {
      heart.innerText = FULL_HEART;
      heart.className = "activated-heart";
    } else {
      heart.innerText = EMPTY_HEART;
      heart.className = "";
    }
  })
  .catch(function(error) {
    errorModal.className = "";
    errorModal.innerText = error;
    setTimeout(() => errorModal.className = "hidden", 3000);
  });
}

for (const glyph of hearts) {
  glyph.addEventListener("click", likeHeart);
}

// Hidden modal test case
describe("main.js", () => {
  let modal;
  
  before(() => {
    modal = document.querySelector("#modal");
  });
  
  it("contains a hidden modal", () => {
    expect(modal).not.to.equal(null);
    expect(modal.classList.contains("hidden")).to.be.true;
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
