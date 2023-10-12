

export default function TGChannel ({
    msg,
    channelName,
}:{
    msg: string,
    channelName?: string|null
}) {
    return (
        <a href={`tg://resolve?domain=${channelName ? channelName : 'KiritouKureha'}&post=${msg}`}>🔗前往 Telegram 頻道</a>
    );
}