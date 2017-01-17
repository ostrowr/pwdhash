document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.getSelected(null,function(tab) {
    addEventListener("keydown", function(e) {
      if (e.keyCode == 13) {
        hashAndAddToClipboard();
      }
      else {
        document.getElementById('copied').innerHTML = ""
      }
    })
	  document.getElementById('domain').value = new URL(tab.url).hostname
  })
}, false);


function hashAndAddToClipboard() {
  var domain = document.getElementById('domain').value;
  var password = document.getElementById('password').value;
  var hashedPass = new sjcl.misc.hmac(sjcl.codec.utf8String.toBits(password))
  hashedPass = hashedPass.encrypt(domain);
  hashedPass = 'P#' + sjcl.codec.hex.fromBits(hashedPass).substr(-12);
  copyTextToClipboard(hashedPass);
  document.getElementById('copied').innerHTML = "New Password Copied to Clipboard.";
}

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}
