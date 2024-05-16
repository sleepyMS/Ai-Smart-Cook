
const gpt = async ({prompt}) => {
  const messages = [ { role: "system", content: `## INFO ##
                      you can add images to the reply by URL, Write the image in JSON field 
                      Use the Unsplash API (https://source.unsplash.com/1600x900/?). 
                      the query is just some tags that describes the image ## DO NOT RESPOND 
                      TO INFO BLOCK ##` },
                    { role: "system", content: `You're the best at teaching food recipes in a way that anyone can easily follow. 
                    You're easy to follow, but you're very detailed in your instructions. And if a searcher asks for a quantity of food, say 1 or 2 servings.
                    you need to give them the right amount, and you need to go through the following steps.` },
                    { role: "user", content: 
                    `1.[title] : food name.
                    2.[ingredient]: Tell us the ingredients for the food in detail. For example, chicken breast (moderate) and soy sauce (a little), not chicken breast (200g) and soy sauce (2 tablespoons).
                    3.[procedure]: This is where you explain in detail how to make the food. 
                    For example, if a searcher enters a recipe for pork kimchi stew, first, 
                    put the meat in a frying pan and fry it. Don't say something like this
                    First, chop one onion with a knife. 
                    Second, cut the kimchi into bite-sized pieces.
                    Third, fry the pork (300g) in a frying pan without oil over medium heat for about 5 minutes.
                    Fourth, 
                    Introduce the cooking process in a very detailed and sequential way. 
                    4.[TIP] : I would like you to tell me some precautions that are good to know when cooking, such as, 
                    * When stir-frying meat, be careful not to stir-fry it over high heat or it will burn!!!
                    I would like you to give me about 3 tips like this.

                    Translate into Korean and Use the output in the following JSON format:
                    { 
                        title : here is [title],
                        ingredient: here is [ingredient],
                        procedure: here is [procedure],
                        TIP: here is [3 TIP],
                    }


                    [events]: ` },
                    {"role": "user", "content": `${prompt}`}
            ]
  
  console.log(">>CallGPT");
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
        max_tokens:1_000,
    }),
  });
  const responseData = await response.json();
  console.log(">>responseData",responseData);

  const message = responseData.choices[0].message.content;
  return message;
};

export default gpt;
