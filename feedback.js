const puppeter = require("puppeteer");

async function start(mail,pass){
    console.log("connect successfully")
    const browser= await puppeter.launch({headless:true,args:["--no-sandbox"]})
    const page = await browser.newPage()
    await page.goto('https://learner.pceterp.in/')
    console.log("got into a webiste")    
    try{
    await page.type("#input-26",mail)
    await page.click("#signinusername > center:nth-child(3) > button:nth-child(1) > span:nth-child(1)")
    await page.waitForTimeout(5000); 
    console.log("done with mail id ")   
    await page.type("#input-32",pass)
    await page.click("#signinpassword > center:nth-child(3) > button:nth-child(1) > span:nth-child(1)")
    console.log("done with password ")   
    console.log("successfully loged in ")
    
    await page.waitForTimeout(5000)

    await page.goto('https://learner.pceterp.in/student-feedback')
    await page.waitForTimeout(5000)
    await page.click('.mb-2 > span:nth-child(1)')
    await page.waitForTimeout(5000)
    await page.click('.mb-2 > span:nth-child(1)')
    console.log("starting the clicking process")
    await page.waitForTimeout(5000)
for (let j = 0 ; j<13;j++){
    await page.evaluate(()=>{
        const div = document.querySelectorAll(".form-group")
        for (let i = 0; i <div.length;i++){
            if (div[i].textContent.trim()==="EXCELLENT"){
                div[i].firstChild.click()
            }
        }
    })
    const ids = await page.$$eval("textarea[name='input-7-4']",(a)=>{
        return a.map(x => x.id)
    })

    console.log(ids)
    for (let a= 0;a<ids.length;a++ ){
        na = `#${ids[a]}`
        console.log(na)
        await page.type(na,"s")
    }
    // await page.type("textarea[name='input-7-4']","@") 
 
    await page.screenshot({path:`amx${j}.png`,fullPage:true})
    await page.click(".mb-2 > span:nth-child(1)")
    await page.waitForTimeout(5000)
    console.log(`completed with ${j}`)
    return "completeted"
}
}

catch(err){
        return "pls check your username and password"
}

    
finally{
    await browser.close()
    console.log("done")
}

}

module.exports ={start}