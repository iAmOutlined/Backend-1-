const fs = require('fs');

module.exports = (app)  => {
  
  app.get('/stats/get/:accountId', (req, res) => {
    const accountId = req.params.accountId

    if (
      !fs.existsSync(
        `./config/${accountId}`
      )
    ) {
      fs.mkdirSync(`./config/${accountId}`);
      fs.mkdirSync(`./config/${accountId}/profiles`);
      fs.copyFileSync(
        `./config_template/profiles/profile_athena.json`,
        `./config/${accountId}/profiles/profile_athena.json`
      );
    }

    fs.readFile(`./config/${accountId}/profiles/profile_athena.json`, 'utf-8', (err, jsonString) => {
      if (err) {
        res.send(err);
      } else {
        const data = JSON.parse(jsonString);
        var datajs = JSON.stringify(data, null, 2);
        res.send(datajs);
      }
    });
  })

  app.get('/stats/getvbucks/:accountId', (req, res) => {
    const accountId = req.params.accountId

    if (
      !fs.existsSync(
        `./config/${accountId}/profiles/profile_common_core.json`
      )
    ) {
      fs.copyFileSync(
        `./config_template/profiles/profile_common_core.json`,
        `./config/${accountId}/profiles/profile_common_core.json`
      );
    }

    fs.readFile(`./config/${accountId}/profiles/profile_common_core.json`, 'utf-8', (err, jsonString) => {
      if (err) {
        res.send(err);
      } else {
        const data = JSON.parse(jsonString);
        var datajs = JSON.stringify(data, null, 2);
        res.send(datajs);
      }
    });
  })

  app.get('/stats/level/:accountId/:level', (req, res) => {
    const level = parseInt(req.params.level)
    const accountId = req.params.accountId
    fs.readFile(`./config/${accountId}/profiles/profile_athena.json`, 'utf-8', (err, jsonString) => {
      if (err) {
        res.send(err);
      } else {
        const data = JSON.parse(jsonString);
        data.stats.attributes.level = level;
        res.send('Changed level for ' + accountId + " to " + level);
        fs.writeFile(`./config/${accountId}/profiles/profile_athena.json`, JSON.stringify(data, null, 2), function writeJSON(err) {
          if (err) return console.log(err);
        })
      }
    });
  })

  app.get('/stats/vbucks/:accountId/:vbucks', (req, res) => {
    const accountId = req.params.accountId
    const vbucks = parseInt(req.params.vbucks)

    if (
      !fs.existsSync(
        `./config/${accountId}/profiles/profile_common_core.json`
      )
    ) {
      fs.copyFileSync(
        `./config_template/profiles/profile_common_core.json`,
        `./config/${accountId}/profiles/profile_common_core.json`
      );
    }

    fs.readFile(`./config/${accountId}/profiles/profile_common_core.json`, 'utf-8', (err, jsonString) => {
      if (err) {
        res.send(err);
      } else {
        const data = JSON.parse(jsonString);
        data.items.Currency_MtxPurchased.quantity = vbucks;
        res.send('Changed vbucks for ' + accountId + " to " + vbucks);
        fs.writeFile(`./config/${accountId}/profiles/profile_common_core.json`, JSON.stringify(data, null, 2), function writeJSON(err) {
          if (err) return console.log(err);
        })
      }
    });
  })

  //
  app.get('/stats/crowns/:accountId/:crowns', (req, res) => {
    const crowns = parseInt(req.params.crowns)
    const accountId = req.params.accountId
    fs.readFile(`./config/${accountId}/profiles/profile_athena.json`, 'utf-8', (err, jsonString) => {
      if (err) {
        res.send(err);
      } else {
        const data = JSON.parse(jsonString);
        data.items.VictoryCrown_defaultvictorycrown.attributes.victory_crown_account_data.total_royal_royales_achieved_count = crowns;
        res.send('Changed crowns for ' + accountId + " to " + crowns);
        fs.writeFile(`./config/${accountId}/profiles/profile_athena.json`, JSON.stringify(data, null, 2), function writeJSON(err) {
          if (err) return console.log(err);
        })
      }
    });
  })

  app.get('/stats/stars/:accountId/:stars', (req, res) => {
    const stars = parseInt(req.params.stars)
    const accountId = req.params.accountId
    fs.readFile(`./config/${accountId}/profiles/profile_athena.json`, 'utf-8', (err, jsonString) => {
      if (err) {
        res.send(err);
      } else {
        const data = JSON.parse(jsonString);
        data.stats.attributes.battlestars = stars;
        res.send('Changed stars for ' + accountId + "to " + stars);
        fs.writeFile(`./config/${accountId}/profiles/profile_athena.json`, JSON.stringify(data, null, 2,), function writeJSON(err) {
          if (err) return console.log(err);
        })
      }
    })
  })
  
  app.all("/api/v1/fortnite-br/surfaces/motd/target", (req,res) => {
  const data = {
	"contentType": "collection",
	"contentId": "motd-default-collection",
	"tcId": "cca20b46-eb7d-4852-94b9-8479ddb53b2d",
	"contentItems": [
		{
			"contentType": "content-item",
			"contentId": "753b2fed-a492-4e11-a34f-9741cc739d47",
			"tcId": "9b89584d-0711-4269-980d-09d50d04f857",
			"contentFields": {
				"body": "Discord Server - https://dsc.gg/atomicfn",
				"entryType": "Text",
				"image": [
					{
						"width": 1920,
						"height": 1080,
						"url": "https://media.discordapp.net/attachments/973471317686911017/1036324161792000070/secret.png"
					},
					{
						"width": 960,
						"height": 540,
						"url": "https://i.imgur.com/SihAyEJ.jpeg"
					}
				],
				"tabTitleOverride": "Atomic Hybrid Server",
				"tileImage": [
					{
						"width": 1024,
						"height": 512,
						"url": "https://i.imgur.com/SihAyEJ.jpeg"
					}
				],
				"title": "Atomic Hybrid Server",
				"videoAutoplay": false,
				"videoLoop": false,
				"videoMute": false,
				"videoStreamingEnabled": false
			},
			"contentSchemaName": "MotdTextNewsWithVideo"
		}
	]
}
  res.json(data)
})

};