let number = 0;
let data = []; // ajax.jsonから取得したデータを格納する変数
const button = document.getElementById('btn');
const titleArea = document.getElementById("title");
const contentArea = document.getElementById("content");
const videoArea = document.getElementById("video");

function getData() {
  // ajax.jsonからデータを取得する処理
  const request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      data = request.response; // 取得したデータをdata変数に格納
      updateVideo(); // 取得後に最初の動画を表示
    }
  };
  request.open("GET", "ajax.json");
  request.responseType = "json";
  request.send(null);
}

function updateVideo() {
  // データを使って動画、タイトル、コンテンツを更新する
  titleArea.innerHTML = data[number].title;
  contentArea.innerHTML = data[number].content;
  videoArea.setAttribute("src", data[number].url);
  number = (number + 1) % data.length; // 次の動画に切り替え
}

function changeVideo() {
  button.addEventListener('click', () => {
    if (data.length === 0) {
      getData(); // 初回のみデータを取得
    } else {
      updateVideo(); // 2回目以降は取得済みのデータを使用
    }
  });
}

window.onload = changeVideo;
