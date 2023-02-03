import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

const downloader = async (url) => {
  const springerLink = "https://link.springer.com";

  const config = {
    method: "get",
    url: "https://link.springer.com/search?query=test&date-facet-mode=between&facet-end-year=2023&facet-start-year=2022&facet-content-type=%22Article%22&facet-discipline=%22Biomedicine%22",
    headers: {
      Cookie:
        "idp_marker=38468109-5976-4d73-8a01-0ae53a40822c; idp_session=sVERSION_18a9ac2ce-bd8b-4bfd-8163-5bfda23ceea9; idp_session_http=hVERSION_15a4970a9-7d09-4d27-a9c5-b7344fe8b951; sim-inst-token=1::1673932133526:a849c3a9; trackid=122e773e6253438f89e3e3f1b",
    },
  };

  const { data } = await axios(config);
  const $ = cheerio.load(data);

  const listItems = $('[class="webtrekk-track pdf-link"]');
  let papers = [];

  listItems.each((idx, el) => {
    const paper = { title: "", link: "", isFree: false };
    paper.link = $(el).attr("href");
    let title = $(el).attr("aria-label");
    const downloadTitle = title.split("-")[0];
    title = title.replace(downloadTitle, "").slice(1).trim();
    paper.title = title;
    papers.push(paper);
  });

  const p = papers[0];
  const downConfig = {
    method: "get",
    url: "https://link.springer.com/content/pdf/10.1186/s12985-022-01874-3.pdf?pdf=core",
    responseType: "stream",
  };
  const __dirname = path.resolve();

  const target_path = path.resolve(__dirname, "my.pdf");
  const input = fs.createWriteStream(target_path, "binary");
  const response = await axios(downConfig);
  await response.data.pipe(input);
};

export default downloader;
