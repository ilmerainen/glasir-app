export default function beginWithUrl(url, targetUrl) {
    const regex = new RegExp(`^${url}`);

    return regex.test(targetUrl);
}
