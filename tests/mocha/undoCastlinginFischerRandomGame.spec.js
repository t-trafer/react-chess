// Generated by Selenium IDE
const { Builder, By, Key, until } = require("selenium-webdriver");
const assert = require("assert");

describe("Undo Castling in Fischer Random Game", function () {
  this.timeout(30000);
  let driver;
  let vars;
  beforeEach(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    vars = {};
  });
  afterEach(async function () {
    await driver.quit();
  });
  it("Undo Castling in Fischer Random Game", async function () {
    await driver.get("https://www.chesslablab.com:9443/");
    await driver.manage().window().setRect({ width: 1366, height: 742 });
    await driver.findElement(By.id("Nav-analysisBoard")).click();
    await driver.findElement(By.id("Nav-analysisBoard-MenuItem-fenString")).click();
    await driver.findElement(By.id("LoadFenDialog-TextField-fen")).click();
    await driver.findElement(By.id("LoadFenDialog-TextField-fen")).sendKeys("rnbqkbrn/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBRN w KQkq -");
    {
      const element = await driver.findElement(
        By.id("LoadFenDialog-TextField-variant")
      );
      await driver.actions({ bridge: true }).moveToElement(element).clickAndHold().perform();
    }
    await driver.findElement(By.id("LoadFenDialog-TextField-variant-MenuItem-960")).click();
    await driver.findElement(By.id("LoadFenDialog-TextField-startPos")).sendKeys("RNBQKBRN");
    await driver.findElement(By.id("LoadFenDialog-Button-load")).click();
    await driver.findElement(By.css(".f1 > img")).click();
    await driver.findElement(By.css(".g1")).click();
    await driver.findElement(By.css(".f8 > img")).click();
    await driver.findElement(By.css(".g8")).click();
    await driver.findElement(By.id("StartedButtons-Button-undoMove")).click();
    await driver.findElement(By.id("StartedButtons-Button-undoMove")).click();
  });
});
