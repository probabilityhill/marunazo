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
          "label": "ゲームスタート(通常ver)",
          "text": "スタート"
        }
      },
      {
        "type": "button",
        "action": {
          "type": "message",
          "label": "ゲームスタート(色対応ver)",
          "text": "cスタート"
        }
      }
    ],
    "paddingAll": "0px"
  }
};

function doPost(e){
  const events = JSON.parse(e.postData.contents).events;
  for (var i = 0; i < events.length; i++){
    execute(events[i]);
  }
}

function execute(event){
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
        case "cスタート":
          var messages = getFlexMessage("Q1のヒントを見る", "ヒント1");
          break;
        case "うらじ":
        case "cうらじ":
          var messages = getFlexMessage("Q2のヒントを見る", "ヒント2");
          break;
        case "りゅう":
        case "cりゅう":
          var messages = getFlexMessage("Q3のヒントを見る", "ヒント3");
          break;
        case "くろう":
        case "cくろう":
          var messages = getFlexMessage("Q4のヒントを見る", "ヒント4");
          break;
        case "じじつ":
        case "cじじつ":
          var messages = getFlexMessage("Q5のヒントを見る", "ヒント5");
          break;
        case "じゅうじ":
        case "cじゅうじ":
          var messages = getFlexMessage("Q6のヒントを見る", "ヒント6");
          break;
        case "ひと":
        case "cひと":
          var messages = getFlexMessage("Q7のヒントを見る", "ヒント7");
          break;
        case "にじ":
        case "cにじ":
          var messages = getFlexMessage("Q8のヒントを見る", "ヒント8");
          break;
        case "つみき":
        case "cつみき":
          var messages = getFlexMessage("Q9のヒントを見る", "ヒント9");
          break;
        case "くじ":
        case "cくじ":
          var messages = getFlexMessage("Q10のヒントを見る", "ヒント10");
          break;
        case "よめ":
        case "cよめ":
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
