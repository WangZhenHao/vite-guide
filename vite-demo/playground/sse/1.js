import { fetchEventSource } from '@microsoft/fetch-event-source';

async function test() {
  const config = {
    openWhenHidden: true,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie:
        "TEST-WZSESSION=MjhlNjdmOGMtMjViZS00NmNmLTkwNzgtZTE1ODYxODk2MTNi;",
    },
    body: JSON.stringify({
      messages: [
        {
          content:
            "1.知识产权名称：开心果票务管理及销售系统 V1.0\r2.知识产权类型：软件著作权\r3.知识产权摘要：null\r4.PS名称：11212121212\r知识产权对企业的高新产品是有技术支撑作用的，但是一定要认真分析两者的内部逻辑关系，请你基于上述文本内容，根据知识产权名称和对应摘要，然后与PS名称对应，一段式分析该知识产权对于PS产品的技术支撑作用（把具体哪里技术支撑写清楚，细节描述清楚，然后具体的支撑应用效果分析清楚，必须要有具体量化的数据分析）。要求：总字数350字以内，一段式，不要罗里吧嗦、文本不需要用综上所述、因此这类无意义的总结把核心内容生成就行，其他无关内容一概不要，不要使用我们等任何主语，写的低调点朴素点提高文本可信度，整个文本丝滑不机械，生成文本直接写具体的支撑作用（不需要你强调和分析背景），因为字数有限，不要超字数。",
          role: "user",
        },
      ],
    }),
  }
  fetchEventSource('https://ips-lc-sit.qizhidao.com/aigc/bigModel/send', {
    ...config,
    onmessage(msg) {
        // if the server emits an error message, throw an exception
        // so it gets handled by the onerror callback below:
        console.log(msg)
    },
  })
  // const request1 = new Request(
  //   "https://ips-lc-sit.qizhidao.com/aigc/bigModel/send",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Cookie:
  //         "TEST-WZSESSION=MjhlNjdmOGMtMjViZS00NmNmLTkwNzgtZTE1ODYxODk2MTNi;",
  //     },
  //     body: JSON.stringify({
  //       messages: [
  //         {
  //           content:
  //             "1.知识产权名称：开心果票务管理及销售系统 V1.0\r2.知识产权类型：软件著作权\r3.知识产权摘要：null\r4.PS名称：11212121212\r知识产权对企业的高新产品是有技术支撑作用的，但是一定要认真分析两者的内部逻辑关系，请你基于上述文本内容，根据知识产权名称和对应摘要，然后与PS名称对应，一段式分析该知识产权对于PS产品的技术支撑作用（把具体哪里技术支撑写清楚，细节描述清楚，然后具体的支撑应用效果分析清楚，必须要有具体量化的数据分析）。要求：总字数350字以内，一段式，不要罗里吧嗦、文本不需要用综上所述、因此这类无意义的总结把核心内容生成就行，其他无关内容一概不要，不要使用我们等任何主语，写的低调点朴素点提高文本可信度，整个文本丝滑不机械，生成文本直接写具体的支撑作用（不需要你强调和分析背景），因为字数有限，不要超字数。",
  //           role: "user",
  //         },
  //       ],
  //     }),
  //   }
  // );
  // const response1 = await fetch(request1);
  // const reader = response1.body.getReader();
  // const decoder = new TextDecoder("utf-8");
  // while (true) {
  //   const { value, done } = await reader.read();
  //   if (done) break;
  //   const result = decoder.decode(value)
  //   const a = result
  //   const q = a.replaceAll(/^([\s\S])*?data:/g, "")
  //   const w = nextOutputText(result)
  //   if(q && !w) {
  //     console.log(result)
  //     debugger
  //   }
  //   console.log(
  //     "qiang:" + q,
  //     '\n',
  //     "wang: " + w,
  //     '\n',
  //     '-------------------------------'
  //   );
  // }
}

function nextOutputText(chunk) {
  // const regex = /data:(.*)/g
  // let match
  // let res = []
  // while ((match = regex.exec(chunk)) !== null) {
  //   const matchedContent = match[1]
  //   res.push(matchedContent)
  // }

  // return res.join('')
  let res = []
  const re = /(data:)(.*)/g
  if(!re.test(chunk)) {
    res.push(chunk)
  } 
  
  chunk.replace(re, function(word, p1, p2) {
    res.push(p2)
  })
  return res.join('')
}
test();
