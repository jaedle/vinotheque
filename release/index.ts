const {Octokit} = require("@octokit/rest");

function requireEnv(env: string) {
    const result = process.env[env];
    if (result == null) {
        throw Error(`Missing ${env}`);
    }

    return result;
}

async function main() {
    try {
        const token = requireEnv('GITHUB_TOKEN');
        const commit = requireEnv('GITHUB_SHA');
        const repository = requireEnv('GITHUB_REPOSITORY');
        const owner = repository.substring(0, repository.indexOf('/'));
        const repo = repository.substring(repository.indexOf('/') + 1);

        const octokit = new Octokit({
            auth: token
        });

        const releases = await octokit.repos.listReleases({
            owner: owner,
            repo: repo,
        });
        const hasLatestRelease = releases.data.length > 0;
        if (hasLatestRelease) {
            await octokit.repos.deleteRelease({
                owner: owner,
                repo: repo,
                release_id: releases.data[0].id
            });
            await octokit.request({
                method: 'DELETE',
                url: `/repos/${owner}/${repo}/git/refs/tags/latest`
            });
        }
        await octokit.repos.createRelease({
            owner: owner,
            repo: repo,
            name: 'latest',
            tag_name: 'latest',
            target_commitish: commit
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main();

