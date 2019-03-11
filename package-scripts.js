const npsUtils = require('nps-utils'); // not required, but handy!
const dinos = require('./dinos');

const herokuDeployCommands = [
    'heroku create $HNAME --region $HREG',
    'heroku git:remote -a $HNAME',
    'heroku buildpacks:add --index 1 heroku/nodejs',
    'heroku buildpacks:add jontewks/puppeteer',
    'git push heroku master -f',
    'heroku ps:restart'
];

const herokuUpdateCommands = [
    'heroku git:remote -a $HNAME',
    'git push heroku master -f'
];

module.exports = {
    scripts: {
        // updates all the dinos
        herokuUpdateAll: npsUtils.series(
            ...dinos.map(({name}) =>
                npsUtils.series(
                    ...herokuUpdateCommands.map(c =>
                        c.replace("$HNAME", name)
                    )
                )
            )
        ),
        // deploy all the dinos
        // if deploying new ones, you should temporally comment out the ones that are already deployed
        herokuDeployAll:
            npsUtils.series(
                ...dinos.map(({name, region}) =>
                    npsUtils.series(
                        ...herokuDeployCommands.map(command =>
                            command
                                .replace("$HNAME", name)
                                .replace("$HREG", region)
                        )
                    )
                )
            )
    },
};

