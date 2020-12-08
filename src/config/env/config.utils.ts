import confLocal from "./env.local";

export class ConfigUtils {

  static getConf(): any {
    switch (process.env.NODE_ENV) {
      default: return confLocal;
    }
  }
}