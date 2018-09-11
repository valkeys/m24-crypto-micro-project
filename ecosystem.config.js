module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [

    // First application
    {
      name: 'F.telegram',
      script: 'F.telegram/src/index.js',
      "exec_mode": "cluster",
      env: {
        APP_NAME:'Telegram IHM',
        // "DEBUG": "*"
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'D.run',
      script: 'D.run/src/index.js',
      "exec_mode": "cluster",
      env: {
        APP_NAME:'BINANCE Event Listener',
        // "DEBUG": "*"
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'C.publish ',
      script: 'C.publish/src/index.js',
      "exec_mode": "cluster",
      env: {
        APP_NAME:'BID/ASK Maker',
        // "DEBUG": "*"
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'B.build',
      script: 'B.build/src/index.js',
      "exec_mode": "cluster",
      env: {
        APP_NAME:'Strategy Matcher',
        // "DEBUG": "*"
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'A.compile',
      script: 'A.compile/src/index.js',
      "exec_mode": "cluster",
      env: {
        // DEBUG: '*',
        APP_NAME:'Signal Compiler',
        SYMBOLS_FILTER: 'btc$',
        // SYMBOLS_FILTER: '(eth|xrp|bcc|ltc|eos|ada|xlm|miota|trx|neo|tusd|bcn|xmr|dash|xem|ven|bnb|etc|qtum|ont)btc$',
        TIMEFRAMES: '1,5,15,60,240,1440'
        // TIMEFRAMES: '15,60'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },

  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      user: 'ubuntu',
      "--aws--":"",
      "key1": "/home/max/.ssh/keysvirginia.pem",      
      host1: '54.210.121.117',
      "--ovh--":"",
      "key": "/home/max/.ssh/id_rsa",
      host:'142.44.246.201',
      ref: 'origin/master',
      repo: 'https://github.com/modestemax/m24-crypto-micro-project',
      path: '/home/ubuntu/m24/prod',
      'post-deploy': 'npm install && pm2 reset all && pm2 flush && pm2 reload ecosystem.config.js --env production --update-env'
    },
    dev: {
      // user: 'node',
      // host: '212.83.163.1',
      // ref: 'origin/master',
      // repo: 'git@github.com:repo.git',
      // path: '/var/www/development',
      // 'post-deploy': 'npm run install && pm2 reload ecosystem.config.js --env dev',
      // env: {
      //   NODE_ENV: 'dev'
      // }
    }
  }
};
