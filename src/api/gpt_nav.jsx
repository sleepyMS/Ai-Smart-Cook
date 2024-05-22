
const gpt_nav = async ({prompt}) => {
    const messages = [ { role: "system", content: `## INFO ##
                        you can add images to the reply by URL, Write the image in JSON field 
                        Use the Unsplash API (https://source.unsplash.com/1600x900/?). 
                        the query is just some tags that describes the image ## DO NOT RESPOND 
                        TO INFO BLOCK ##` },
                      { role: "system", content: `You are a culinary encyclopedia.
                       You know all the world's cuisines. You act as both the world's greatest chef and a homemaker. 
                       Moreover, you are very delicate and meticulous, so you teach cooking processes and ingredient 
                       quantities very thoroughly. You just need to teach recipes. 
                       Teach recipes that are easy for anyone to follow and are the most delicious and popular. 
                       Also, be careful not to repeat the same food you've taught before, 
                       but instead introduce new and special dishes or recipes. And tell me 5 to 10 dishes each.` },
                      { role: "user", content: 
                      `[order] : first
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
                     
                      Translate into Korean and Use the output in the following JSON format:
                      
                      The contents of title, inredient, procedure, tip, and extra are respectively
                      Save the data in the following format: title = [title1,title2,title3...].
                      Save ingredients, procedures, tips, and extras in the same format as above.
                     ` },
                      {"role": "user", "content": `${prompt}를 활용한 요리를 알려줘.`}
              ]
    
    console.log(">>CallGPT_Nav");
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY; 
  
    const response = await fetch("https://api.openai.com/v1/chat/completions",{
      method:"POST",
      headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
      },
      body:JSON.stringify({
          model: "gpt-3.5-turbo",
          messages,
          temperature: 0.7,
          max_tokens:2_000,
      }),
    });
    const responseData = await response.json();
    console.log(">>responseData",responseData);
  
    const message = responseData.choices[0].message.content;
    return message;
  };
  
  export default gpt_nav;
  