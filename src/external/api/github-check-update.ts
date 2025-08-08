import PKG from '../../../package.json'
import { octokit } from './octokit'

export const checkUpdateFromGitHub = async () => {
  const { data: system } = await octokit.rest.repos.getLatestRelease({
    owner: 'rowania',
    repo: 'mx-server',
  })

  const { data: dashboard } = await octokit.rest.repos.getLatestRelease({
    owner: 'rowania',
    repo: PKG.name,
  })

  return {
    system: system.tag_name.replace(/^v/, ''),
    dashboard: dashboard.tag_name.replace(/^v/, ''),
    systemRelease: system,
    dashboardRelease: dashboard,
  }
}

export const getReleaseDetails = async (repo: 'mx-server' | 'mx-admin', tagName: string) => {
  const { data } = await octokit.rest.repos.getReleaseByTag({
    owner: 'rowania',
    repo,
    tag: `v${tagName}`,
  })
  
  return {
    name: data.name,
    body: data.body,
    html_url: data.html_url,
    published_at: data.published_at,
    tag_name: data.tag_name,
  }
}
