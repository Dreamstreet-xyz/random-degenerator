import {
    Section,
    Header,
    Decoration,
    Title,
    Accordion,
    FAQContent,
    Paragraph,
    FAQButton,
} from './styles';

export default function FAQ() {
    return (
        <Section>
            <Header>
                <Decoration />
                <Title>F.A.Q.</Title>
            </Header>
            <Accordion
                renderButton={({ handleClick }) => (
                    <FAQButton onClick={handleClick}>What is Random Degenerator?</FAQButton>
                )}
            >
                <FAQContent>
                    <Paragraph>
                        A trade randomizer for <a href="https://gains.trade">gTrade</a>, a
                        decentralized leverage trading platform built by{' '}
                        <a href="https://gainsnetwork.io">Gains Network</a>
                    </Paragraph>
                    <Paragraph>
                        Transactions are submitted to smart contracts running on the{' '}
                        <a href="https://polygon.technology">Polygon blockchain</a>.
                    </Paragraph>
                </FAQContent>
            </Accordion>
            <Accordion
                renderButton={({ handleClick }) => (
                    <FAQButton onClick={handleClick}>How do I use Random Degenerator?</FAQButton>
                )}
            >
                <FAQContent>
                    <Paragraph>
                        You provide collateral and we generate a random trade for you.
                    </Paragraph>
                    <Paragraph>
                        <ol>
                            <li>1. Connect your wallet</li>
                            <li>
                                2. Connect to a supported network (Polygon for mainnet, Mumbai for
                                testnet)
                            </li>
                            <li>3. Enter your collateral amount</li>
                            <li>4. Click the "Play" button</li>
                            <li>5. Approve the wallet transaction and you're done!</li>
                        </ol>
                    </Paragraph>
                </FAQContent>
            </Accordion>
            <Accordion
                renderButton={({ handleClick }) => (
                    <FAQButton onClick={handleClick}>How do I manage my trade?</FAQButton>
                )}
            >
                <FAQContent>
                    <Paragraph>
                        Ok well this depends on how you're treating this. Is it a bet? Is it a
                        trade?
                    </Paragraph>
                    <Paragraph>
                        If this is a bet, you can manage it directly from the UI. When that PnL is
                        green enough, close it out. Or, chance it and wait for the baked in take
                        profit %.
                    </Paragraph>
                    <Paragraph>
                        If this is a trade, head over to <a href="https://gains.trade">gTrade</a>{' '}
                        and utilize the trading interface. Yep, that's right, these trades magically
                        appear on your gTrade dashboard as well.
                    </Paragraph>
                </FAQContent>
            </Accordion>
            <Accordion
                renderButton={({ handleClick }) => (
                    <FAQButton onClick={handleClick}>
                        What about the trade is being "randomized"?{' '}
                    </FAQButton>
                )}
            >
                <FAQContent>
                    <Paragraph>Ok so you provide collateral range and we randomize:</Paragraph>
                    <Paragraph>
                        <ul>
                            <li>
                                Collateral -- but only within your range. Set them to the same value
                                to forego.
                            </li>
                            <li>
                                Pair -- we support crypto only at the moment, but any pair gTrade
                                supports, we support. Real time.
                            </li>
                            <li>Leverage -- from 5-150x</li>
                            <li>Position -- short / long</li>
                            <li>Stop loss -- guaranteed SL provided by gTrade</li>
                            <li>Take profit</li>
                        </ul>
                    </Paragraph>
                    <Paragraph>
                        We also utilize the Chainlink decentralized oracle network (DON) like gTrade
                        for providing the open price of an asset!
                    </Paragraph>
                </FAQContent>
            </Accordion>
            <Accordion
                renderButton={({ handleClick }) => (
                    <FAQButton onClick={handleClick}>I still have questions!</FAQButton>
                )}
            >
                <FAQContent>
                    <Paragraph>
                        Come chat in our Telegram <a href="https://t.me/randomdegenerator">chat</a>
                    </Paragraph>
                </FAQContent>
            </Accordion>
        </Section>
    );
}
