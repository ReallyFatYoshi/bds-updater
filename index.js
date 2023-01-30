import * as child_process from "node:child_process";
import * as fs from "node:fs";

try {
    child_process.exec(
        'curl -H "User-Agent:  Mozilla/5.0 (Windows NT 10.0; Win32; x32; rv:103.0) Gecko/30200202 Firefox/101" https://www.minecraft.net/en-us/download/server/bedrock',
        function (_, res) {
          // const download = res.match(
          //  /https\:\/\/minecraft\.azureedge\.net\/bin-win\/bedrock-server-\d+\.\d+\.\d+\.\d+\.zip/gm
          )[0]?.replace(/http(s)?:\/\//g,"");
          const version = download.match(
            /(?<=(https\:\/\/)?minecraft\.azureedge\.net\/bin-win\/bedrock-server-)\d+\.\d+\.\d+\.\d+(?=\.zip)/gm
          )[0];
      
          fs.writeFileSync(
            "./win/config.json",
            JSON.stringify({
              download: `https://minecraft.azureedge.net/bin-win/bedrock-server-${version}.zip`,
              version,
            },
            0,
            3)
          );
          
          fs.writeFileSync(
            "./linux/config.json",
            JSON.stringify({
              download: `https://minecraft.azureedge.net/bin-linux/bedrock-server-${version}.zip`,
              version,
            },
            0,
            3)
           );
        }
      );
} catch(err) {}
