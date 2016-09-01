/*
  Helper to get environment configs. See the DefinePlugin in webpack.config.js
*/
export abstract class Options {
  abstract baseUrl(): string;
  abstract navUrl(): string;
  abstract cakeUrl(): string;
  abstract drupalUrl(): string;
  abstract assetsUrl(): string;
  abstract environment(): string;
}

class DevOptions extends Options {
  baseUrl() { return "http://local.usafootball.com:8081/"; }
  navUrl() { return "https://s3.amazonaws.com/public-usaf/usaf/int/nav/nav.min.js"; }
  cakeUrl() { return "https://www2-int.usafootball.com"; }
  drupalUrl() { return "https://int.usafootball.com"; }
  assetsUrl() { return "https://assets.usafootball.com"; }
  environment() { return "dev"; }
}

class IntOptions extends Options {
  baseUrl() { return "https://api-int.usafootball.com/"; }
  navUrl() { return "https://s3.amazonaws.com/public-usaf/usaf/int/nav/nav.min.js"; }
  cakeUrl() { return "https://www2-int.usafootball.com"; }
  drupalUrl() { return "https://int.usafootball.com"; }
  assetsUrl() { return "https://assets.usafootball.com"; }
  environment() { return "int"; }
}

class UatOptions extends Options {
  baseUrl() { return "https://api-uat.usafootball.com/"; }
  navUrl() { return "https://s3.amazonaws.com/public-usaf/usaf/uat/nav/nav.min.js"; }
  cakeUrl() { return "https://cake-uat.usafootball.com"; }
  drupalUrl() { return "https://uat.usafootball.com"; }
  assetsUrl() { return "https://assets.usafootball.com"; }
  environment() { return "uat"; }
}

class PrdOptions extends Options {
  baseUrl() { return "https://api.usafootball.com/"; }
  navUrl() { return "https://assets.usafootball.com/usaf/prd/nav/nav.min.js"; }
  cakeUrl() { return "https://cake-uat.usafootball.com"; }
  drupalUrl() { return "https://uat.usafootball.com"; }
  assetsUrl() { return "https://assets.usafootball.com"; }
  environment() { return "prd"; }
}

let opts: Options;

switch (ENV) {
  case "prd":
    opts = new PrdOptions();
    break;
  case "uat":
    opts = new UatOptions();
    break;
  case "int":
    opts = new IntOptions();
    break;
  case "dev":
    opts = new DevOptions();
    break;
  default:
    console.warn("Setting to default DEV options - NOT FOR PRODUCTION");
    opts = new DevOptions();
}

export class Config {
  static get BASE_URL(): string {
    return opts.baseUrl();
  };

  static get NAV_URL(): string {
    return opts.navUrl();
  }

  static get CAKE_URL(): string {
    return opts.cakeUrl();
  }

  static get DRUPAL_URL(): string {
    return opts.drupalUrl();
  }

  static get ENVIRONMENT(): string {
    return opts.environment();
  }

  static get ASSETS_URL(): string {
    return opts.assetsUrl();
  }
}
