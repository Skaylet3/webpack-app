export interface BuildPaths {
  entry: string
  html: string
  output: string

}

export type buildMode = 'production' | 'development';

export interface BuildOptions {
  port: number
  paths: BuildPaths
  mode: buildMode
}