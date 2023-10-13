

export default function SteamWidget({ gameId }:{ gameId: string }) {
    return (
        <div className="steam-widget rounded o-hidden box-shadow" style={{"backgroundColor": "#282e39"}}>
        <iframe src={`https://store.steampowered.com/widget/${gameId}/`} frameBorder="0" width="100%" height="200px" loading="lazy"></iframe>
        </div>
    );
}