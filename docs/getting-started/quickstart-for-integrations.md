## Quick start for integrations


Alongside with the interface to interact with the DSponsor smart-contracts. 
The DSponsor SDK also provides a way to integrates easily with your app.

### SDK 

1. **Install the SDK**: Ensure `@dsponsor/sdk` is installed in your project. If not, add it via npm or yarn.

2. **Initialize AdSpaceRenderer**: Import and initialize `AdSpaceRenderer` within your JavaScript file, specifying your contract address and desired options.

```javascript
import { AdSpaceRenderer } from "@dsponsor/sdk";

const OFFER_ID = 1;
const sponsoredItem = AdSpaceRenderer.fromOffer(OFFER_ID);
```

Preload and Display Ads: Before displaying ads, preload the ad data, then select and render the ads within your specified element.

```javascript
await sponsoredItem.preload();
const ads = sponsoredItem.select('random 1'); // Example selection
// The render() displays ads in a dynamic grid layout. Customize the grid and ad elements as needed.
```

### Iframe Integration

To display ad spaces within an iframe:

Construct the Iframe URL: 

Use the formUrl function to generate the deterministic iframe URL based on the contract address and desired display options (e.g., grid or random).

```javascript
function formUrl(contractAddress, options) {
    if (options === 'responsive') {
        return `${BASE_URL}${contractAddress}`;
    } else if (options.startsWith('grid')) {
        const [type, count] = options.split('=');
        return `${BASE_URL}${contractAddress}?${type}=${count}`;
    } else if (options.startsWith('random')) {
        const [type, count] = options.split('=');
        return `${BASE_URL}${contractAddress}?${type}=${count}`;
    }

    return `${BASE_URL}${contractAddress}?${options}`;
}
const iframeUrl = formUrl('YOUR_CONTRACT_ADDRESS', 'grid=2x2');
```
Embed the Iframe: Insert the iframe into your HTML with the generated URL.

```html
<iframe src="{iframeUrl}" width="1000" height="500"></iframe>
```


### React Integration

Integrating ad spaces in a React application involves fetching and displaying ads within your component's render logic.

Import and Initialize: Within your component, import AdSpaceRenderer and initialize it with your contract address.

```javascript
import { AdSpaceRenderer } from "@dsponsor/sdk";

// Inside your component
const sponsoredItem = AdSpaceRenderer.fromOffer(10, {
    selector: 'dsponsor',
});

```
Fetch and Set Ads: Use the useEffect hook to preload ads and store them in your component's state.

```javascript
useEffect(() => {
    async function fetchAds() {
        await sponsoredItem.preload();
        const ads = sponsoredItem.select('grid 2x4');
        setAds(ads);
    }
    fetchAds();
}, [sponsoredItem]);
```
Render Ads: Use the ad data stored in your component's state to dynamically render ad spaces within your component.

```javascript
return (
    <div>
        {ads.map(ad => (
             <a href={ad.records['linkURL']} key={ad.offerId + '-' + ad.tokenId} style={{ display: 'block', marginBottom: '10px' }}>
                <img src={ad.records['imageURL']} alt="Ad" style={{ width: '100%', height: 'auto' }}/>
            </a>
        ))}
    </div>
);
```

### HTML

Users can also integrate DSponsor by adding a simple HTML snippet to their website or Github Pages. 

#### With the SDK

```html
<html>
<head>
    <title>Home</title>
    <script type="module">
        import { AdSpaceRenderer } from 'https://unpkg.com/@dsponsor/sdk';
        const sponsoredItem = AdSpaceRenderer.fromOffer(23, {
            selector: 'dsponsor',
        })
        await sponsoredItem.connect();
        console.log('Connected to the contract');
        await sponsoredItem.preload();
        const container = sponsoredItem.render({theme: 'blue'});
        document.getElementById('dsponsor').appendChild(container);
    </script>
</head>
<body>
<div id="dsponsor"></div>
</body>
</html>
```

#### Pure HTML

This method will provide with a CSS customisable grid, and using deterministic link and image.  
Via the endpoints `https://relayer.dsponsor.com/ad/{offerId}/{tokenId}/image` and `https://relayer.dsponsor.com/ad/{offerId}/{tokenId}/link`.
This is to be repeated for each available adspace token.

```html
<div id="dsponsor">
    <div class="ad-space">
        <!-- Replace [offerId] and [tokenId] with the actual values -->
        <a href="https://relayer.dsponsor.com/ad/[offerId]/0/link">
            <img src="https://relayer.dsponsor.com/ad/[offerId]/0/image" alt="AdSpace" />
        </a>
    </div>
   <div class="ad-space">
       <a href="https://relayer.dsponsor.com/ad/[offerId]/1/link">
           <img src="https://relayer.dsponsor.com/ad/[offerId]/1/image" alt="AdSpace" />
       </a>
   </div>
    <div class="ad-space">
        <a href="https://relayer.dsponsor.com/ad/[offerId]/2/link">
            <img src="https://relayer.dsponsor.com/ad/[offerId]/2/image" alt="AdSpace" />
        </a>
    </div>
</div>
```


