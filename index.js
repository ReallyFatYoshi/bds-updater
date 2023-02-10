import * as child_process from "node:child_process";
import * as fs from "node:fs";

try {
    child_process.exec(
        'curl -H "User-Agent:  Mozilla/5.0 (Windows NT 10.0; Win32; x32; rv:103.0) Gecko/30200202 Firefox/101" https://www.minecraft.net/en-us/download/server/bedrock',
        function (_, res) {
          const downloadStable = res.match(
           /https\:\/\/minecraft\.azureedge\.net\/bin-win\/bedrock-server-(\d+(\.)?){3,4}\.zip/gm
          )[0]?.replace(/http(s)?:\/\//g,"");
          const downloadPreview = res.match(
              /https\:\/\/minecraft\.azureedge\.net\/bin-win-preview\/bedrock-server-(\d+(\.)?){3,4}\.zip/gm
          )[0]?.replace(/http(s)?:\/\//g,"");
            
          const stableversion = downloadStable.match(
            /(?<=(https\:\/\/)?minecraft\.azureedge\.net\/bin-win\/bedrock-server-)(\d+(\.)?){3,4}(?=\.zip)/gm
          )[0] ?? 0;
          const previewversion = downloadStable.match(
            /(?<=(https\:\/\/)?minecraft\.azureedge\.net\/bin-win-preview\/bedrock-server-)(\d+(\.)?){3,4}(?=\.zip)/gm
          )[0] ?? 0;
      
          fs.writeFileSync(
            "./win/config.json",
            JSON.stringify({
              preview: {
                download: `https://minecraft.azureedge.net/bin-win-preview/bedrock-server-${previewversion}.zip`,
                version: previewversion,
              },
              stable: {
                download: `https://minecraft.azureedge.net/bin-win/bedrock-server-${stableversion}.zip`,
                version: stableversion,
              },
            },
            0,
            3)
          );
          
          fs.writeFileSync(
            "./linux/config.json",
            JSON.stringify({
              preview: {
                download: `https://minecraft.azureedge.net/bin-linux-preview/bedrock-server-${previewversion}.zip`,
                version: previewversion,
              },
              stable: {
                download: `https://minecraft.azureedge.net/bin-linux/bedrock-server-${stableversion}.zip`,
                version: stableversion,
              },
            },
            0,
            3)
           );
        }
      );
} catch(err) {}
