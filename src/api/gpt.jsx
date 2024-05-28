const gpt = async ({ prompt }) => {
  const messages = [
    {
      role: "system",
      content: `## INFO ##
                        you can add images to the reply by URL, Write the image in JSON field 
                        Use the Unsplash API (https://source.unsplash.com/1600x900/?). 
                        the query is just some tags that describes the image ## DO NOT RESPOND 
                        TO INFO BLOCK ##`,
    },
    {
      role: "system",
      content: `You are a culinary encyclopedia.
                       You know all the world's cuisines. You act as both the world's greatest chef and a homemaker. 
                       Moreover, you are very delicate and meticulous, so you teach cooking processes and ingredient 
                       quantities very thoroughly. You just need to teach recipes. 
                       Teach recipes that are easy for anyone to follow and are the most delicious and popular. 
                       Also, be careful not to repeat the same food you've taught before, 
                       but instead introduce new and special dishes or recipes. And tell me 5 to 10 dishes each.
                      `,
    },
    {
      role: "user",
      content: `[order] : first
                      [title]: Food Name
                      [ingredient]: Provide detailed information about the ingredients suitable for the dish. For example, chicken breast (moderate), soy sauce (a little). For instance, chicken breast (200g), soy sauce (2 tablespoons). Please provide information in this format.
                      [procedure]: Now, let's delve into how to make the dish very thoroughly. For example, if a user searches for a recipe for pork kimchi stew, don't just say something like, "First, put the meat in a frying pan and fry it." Instead, provide detailed instructions in the following manner:
                      First, finely chop one onion with a knife.
                      Second, cut the kimchi into bite-sized pieces.
                      Third, fry the pork (300g) in a frying pan over medium heat without oil for about 5 minutes.
                      Fourth, continue with the cooking process in a very detailed and sequential manner.
                      [tip]: It would be great if you could provide some helpful precautions to keep in mind while cooking. For example,
                      Be careful not to stir-fry the meat over high heat, as it may burn!!!
                      It would be great to provide about three precautions like this.
                      [extra]: Additionally, it would be great if you could teach about ingredients that would be good to add.
                      
                      [order] : second
                      [title]: Food Name
                      [ingredient]: Provide detailed information about the ingredients suitable for the dish. For example, chicken breast (moderate), soy sauce (a little). For instance, chicken breast (200g), soy sauce (2 tablespoons). Please provide information in this format.
                      [procedure]: Now, let's delve into how to make the dish very thoroughly. For example, if a user searches for a recipe for pork kimchi stew, don't just say something like, "First, put the meat in a frying pan and fry it." Instead, provide detailed instructions in the following manner:
                      First, finely chop one onion with a knife.
                      Second, cut the kimchi into bite-sized pieces.
                      Third, fry the pork (300g) in a frying pan over medium heat without oil for about 5 minutes.
                      Fourth, continue with the cooking process in a very detailed and sequential manner.
                      [tip]: It would be great if you could provide some helpful precautions to keep in mind while cooking. For example,
                      Be careful not to stir-fry the meat over high heat, as it may burn!!!
                      It would be great to provide about three precautions like this.
                      [extra]: Additionally, it would be great if you could teach about ingredients that would be good to add.
  
                      [order] : third
                      [title]: Food Name
                      [ingredient]: Provide detailed information about the ingredients suitable for the dish. For example, chicken breast (moderate), soy sauce (a little). For instance, chicken breast (200g), soy sauce (2 tablespoons). Please provide information in this format.
                      [procedure]: Now, let's delve into how to make the dish very thoroughly. For example, if a user searches for a recipe for pork kimchi stew, don't just say something like, "First, put the meat in a frying pan and fry it." Instead, provide detailed instructions in the following manner:
                      First, finely chop one onion with a knife.
                      Second, cut the kimchi into bite-sized pieces.
                      Third, fry the pork (300g) in a frying pan over medium heat without oil for about 5 minutes.
                      Fourth, continue with the cooking process in a very detailed and sequential manner.
                      [tip]: It would be great if you could provide some helpful precautions to keep in mind while cooking. For example,
                      Be careful not to stir-fry the meat over high heat, as it may burn!!!
                      It would be great to provide about three precautions like this.
                      [extra]: Additionally, it would be great if you could teach about ingredients that would be good to add.
                      
                      [order] : fourth
                      [title]: Food Name
                      [ingredient]: Provide detailed information about the ingredients suitable for the dish. For example, chicken breast (moderate), soy sauce (a little). For instance, chicken breast (200g), soy sauce (2 tablespoons). Please provide information in this format.
                      [procedure]: Now, let's delve into how to make the dish very thoroughly. For example, if a user searches for a recipe for pork kimchi stew, don't just say something like, "First, put the meat in a frying pan and fry it." Instead, provide detailed instructions in the following manner:
                      First, finely chop one onion with a knife.
                      Second, cut the kimchi into bite-sized pieces.
                      Third, fry the pork (300g) in a frying pan over medium heat without oil for about 5 minutes.
                      Fourth, continue with the cooking process in a very detailed and sequential manner.
                      [tip]: It would be great if you could provide some helpful precautions to keep in mind while cooking. For example,
                      Be careful not to stir-fry the meat over high heat, as it may burn!!!
                      It would be great to provide about three precautions like this.
                      [extra]: Additionally, it would be great if you could teach about ingredients that would be good to add.
                     
                      [order] : fifth
                      [title]: Food Name
                      [ingredient]: Provide detailed information about the ingredients suitable for the dish. For example, chicken breast (moderate), soy sauce (a little). For instance, chicken breast (200g), soy sauce (2 tablespoons). Please provide information in this format.
                      [procedure]: Now, let's delve into how to make the dish very thoroughly. For example, if a user searches for a recipe for pork kimchi stew, don't just say something like, "First, put the meat in a frying pan and fry it." Instead, provide detailed instructions in the following manner:
                      First, finely chop one onion with a knife.
                      Second, cut the kimchi into bite-sized pieces.
                      Third, fry the pork (300g) in a frying pan over medium heat without oil for about 5 minutes.
                      Fourth, continue with the cooking process in a very detailed and sequential manner.
                      [tip]: It would be great if you could provide some helpful precautions to keep in mind while cooking. For example,
                      Be careful not to stir-fry the meat over high heat, as it may burn!!!
                      It would be great to provide about three precautions like this.
                      [extra]: Additionally, it would be great if you could teach about ingredients that would be good to add.
                     
                      Use the output in the following JSON format:
                      
                      The contents of title, inredients, procedures, tips, and extras are respectively
                      Save the data in the following format: title = [title1,title2,title3...].
                      Save ingredients, procedures, tips, and extras in the same format as above.
              
                     `,
    },
    { role: "user", content: `${prompt}를 활용한 요리를 알려줘.` },
  ];

  console.log(">>CallGPT");
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 2_000,
    }),
  });
  const responseData = await response.json();
  // console.log(">>responseData", responseData);

  const message = responseData.choices[0].message.content;
  // console.log(message);
  return message;
};

export default gpt;

// const gpt = async ({ prompt }) => {
//   const messages = [
//     { role: "system", content: `## INFO ## 이미지를 URL로 첨부할 수 있습니다. JSON 필드에 이미지를 기재하세요. Unsplash API (https://source.unsplash.com/1600x900/?)를 사용하세요. 쿼리는 이미지를 설명하는 태그입니다. ## INFO BLOCK에 답하지 마세요. ##` },
//     { role: "system", content: `음식 레시피를 가르치는 데 최고입니다. 누구나 쉽게 따를 수 있습니다. 상세한 지침으로 간단하게 따라가는 것이 특징입니다. 검색자가 음식의 양을 물으면 1 또는 2 인분이라고 말하세요. 올바른 양을 제공해야 하며 다음 단계를 따라야 합니다.` },
//     { role: "user", content: `1.[title] : 음식 이름.
// 2.[ingredient]: 음식의 세부 재료를 알려주세요. 예를 들어, 닭가슴살 (적당량) 및 간장 (조금)이 아니라 닭가슴살 (200g) 및 간장 (2큰술)입니다.
// 3.[procedure]: 음식을 만드는 방법을 자세히 설명하세요. 예를 들어, 돼지 김치찌개 레시피를 입력하면 먼저, 고기를 팬에 넣고 볶아주세요. 칼로 양파 하나를 썰어서라는 식으로 말하지 마세요. 첫 번째로, 중약 불에 기름 없이 돼지고기 (300g)를 약 5분 동안 볶습니다. 그다음,
// 매우 자세하고 순차적으로 조리 과정을 소개하세요.
// 4.[TIP] : 조리 시 유의해야 할 몇 가지 주의사항을 알려주세요. 예를 들어, 고기를 볶을 때 높은 온도로 볶으면 타므로 주의하세요!!!
// 이와 같은 팁을 약 3가지 알려주세요.

// 한국어로 번역하고 다음과 같은 JSON 형식을 사용하세요:
// {
//     title : here is [title],
//     ingredient: here is [ingredient],
//     procedure: here is [procedure],
//     TIP: here is [3 TIP],
// }
// [events]: ` },
//     { "role": "user", "content": `${prompt}` }
//   ];

//   console.log(">> CallGPT");
//   const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

//   const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages,
//       temperature: 0.7,
//       max_tokens: 1000, // underscore removed from max_tokens
//     }),
//   });

//   const responseData = await response.json(); // Parsing JSON directly from response
//   const messageContent = JSON.parse(responseData.choices[0].message.content);

//   const title = messageContent.title;
//   const ingredient = messageContent.ingredient;

//   console.log("Title:", title);
//   console.log("Ingredient:", ingredient);

//   return { title, ingredient };
// };

// export default gpt;
