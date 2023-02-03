import inquirer from "inquirer";
import downloader from "./downloader.js";

const subjects = [
  "Biomedicine",
  "Business and Management",
  "Chemistry",
  "Computer Science",
  "Earth Sciences",
  "Economics",
  "Education",
  "Engineering",
  "Environment",
  "Geography",
  "History",
  "Law",
  "Life Sciences",
  "Literature",
  "Materials Science",
  "Mathematics",
  "Medicine & Public Health",
  "Pharmacy",
  "Philosophy",
  "Physics",
  "Political Science and International Relations",
  "Psychology",
  "Social Sciences",
  "Statistics",
];

function main() {
  let subject = "";
  let keyword = "";
  let startYear = 2022;
  let endYear = 2023;

  inquirer
    .prompt([
      {
        type: "list",
        name: "Subjects",
        message: "Select an Item from below list",
        choices: [...subjects, "Exit"],
      },
    ])
    .then((answers) => {
      if (answers.Subjects == "Exit") {
        process.exit();
      } else {
        subject = answers.Subjects;

        inquirer
          .prompt([
            {
              type: "input",
              name: "keyword",
            },
          ])
          .then((answer) => {
            keyword = answer.keyword;

            inquirer
              .prompt([
                {
                  type: "number",
                  name: "startYear",
                },
              ])
              .then((answer) => {
                startYear = answer.startYear;
                inquirer
                  .prompt([
                    {
                      type: "number",
                      name: "endYear",
                    },
                  ])
                  .then((answer) => {
                    endYear = answer.endYear;
                    console.log(
                      `😜 You are downloading papers from \n https://link.springer.com from \n 🫣 ${subject} \n with keyword 🫣 ${keyword} \n between 🫢 ${startYear} and 🫢 ${endYear}`
                    );
                    const url = `https://link.springer.com/search?query=${keyword}&sortOrder=newestFirst&date-facet-mode=between&facet-end-year=${endYear}&facet-start-year=${startYear}&facet-content-type=%22Article%22&facet-discipline=%22${subject}%22`;
                    downloader(url);
                  });
              });
          });
      }
    });
}
// main();

const url =
  "https://link.springer.com/search?query=genome&sortOrder=newestFirst&date-facet-mode=between&facet-end-year=2023&facet-start-year=2022&facet-content-type=%22Article%22&facet-discipline=%22Biomedicine%22";

downloader(url);
