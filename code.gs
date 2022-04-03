const scriptProperties = PropertiesService.getScriptProperties();
const ACCESS_TOKEN = scriptProperties.getProperty('ACCESS_TOKEN');

const startList = {
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "button",
        "action": {
          "type": "message",
          "label": "ゲームスタート",
          "text": "スタート"
        }
      },
      {
        "type": "button",
        "action": {
          "type": "message",
          "label": "色が見えにくい方はこちら",
          "text": "cスタート"
        }
      }
    ],
    "paddingAll": "0px"
  }
};

function doPost(e){
  var event = JSON.parse(e.postData.contents).events[0];
  if(event.type === "follow"){
    var reply_token = event.replyToken;
    var messages = getFlexMessage("注意事項を読む", "注意事項");
    sendReplyMessage(reply_token, messages);
  }
  else if(event.type === "message"){
    if(event.message.type === "text"){
      var text = event.message.text;
      var reply_token = event.replyToken;

      switch(text){
        case "注意事項":
          var messages = getFlexMessage("お試しのヒントを見る", "お試しヒント");
          break;
        case "お試しヒント":
          var messages = [{
            'type':'flex',
            'altText':'スタート',
            'contents':startList
          }];
          break;
        case "スタート":
          var messages = getFlexMessage("Q1のヒントを見る", "ヒント1");
          break;
        case "cスタート":
          var messages = getFlexMessage("Q1のヒントを見る", "ヒント1");
          break;
        case "うらじ":
          var messages = getFlexMessage("Q2のヒントを見る", "ヒント2");
          break;
        case "りゅう":
          var messages = getFlexMessage("Q3のヒントを見る", "ヒント3");
          break;
        case "くろう":
          var messages = getFlexMessage("Q4のヒントを見る", "ヒント4");
          break;
        case "じじつ":
          var messages = getFlexMessage("Q5のヒントを見る", "ヒント5");
          break;
        case "じゅうじ":
          var messages = getFlexMessage("Q6のヒントを見る", "ヒント6");
          break;
        case "ひと":
          var messages = getFlexMessage("Q7のヒントを見る", "ヒント7");
          break;
        case "にじ":
          var messages = getFlexMessage("Q8のヒントを見る", "ヒント8");
          break;
        case "つみき":
          var messages = getFlexMessage("Q9のヒントを見る", "ヒント9");
          break;
        case "くじ":
          var messages = getFlexMessage("Q10のヒントを見る", "ヒント10");
          break;
        case "よめ":
          var messages = getFlexMessage("最終問題のヒントを見る", "ラストヒント");
          break;
      }
      
      sendReplyMessage(reply_token, messages);
    }
  }

  function getFlexMessage(label, text){
    return [{
      'type':'flex',
      'altText':label,
      'contents':{
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "button",
              "action": {
                "type": "message",
                "label": label,
                "text": text
              }
            }
          ],
          "paddingAll": "0px"
        }
      }
    }];
  }

}

function sendReplyMessage(reply_token, messages){
  var url = 'https://api.line.me/v2/bot/message/reply';
  var res = UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': messages 
    }),
  });
  return res;
}
