const npsUtils = require('nps-utils'); // not required, but handy!
const dinos = require('./dinos');

const herokuDeployCommands = [
    'heroku create $HEROKU_NAME --region $HEROKU_REGION',
    'heroku git:remote -a $HEROKU_NAME',
    'heroku buildpacks:add --index 1 heroku/nodejs',
    'heroku buildpacks:add jontewks/puppeteer',
    'git push heroku master -f',
    'heroku ps:restart'
];

const herokuUpdateCommands = [
    'heroku git:remote -a $HEROKU_NAME',
    'git push heroku master -f'
];

module.exports = {
    scripts: {
        // updates all the dinos
        herokuUpdateAll: npsUtils.series(
            ...dinos.map(({name}) =>
                npsUtils.series(
                    ...herokuUpdateCommands.map(c =>
                        c.replace("$HEROKU_NAME", name)
                    )
                )
            )
        ),
        // deploy all the dinos from dinos.js
        // if deploying new ones, you should temporally comment out the ones that are already deployed
        herokuDeployAll:
            npsUtils.series(
                ...dinos.map(({name, region}) =>
                    npsUtils.series(
                        ...herokuDeployCommands.map(command =>
                            command
                                .replace("$HEROKU_NAME", name)
                                .replace("$HEROKU_REGION", region)
                        )
                    )
                )
            )
    },
};

