/* eslint-disable no-confusing-arrow */
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Icon } from 'components/common';
import {
    Container,
    Card,
    Field,
    Label,
    Value,
    ActionRow,
    GainsLogo,
    ResultsTitle,
    Fees,
    ActionButton,
    ActionLink,
} from './styles';
import { StorageInterfaceV5 } from 'types/ethers-contracts/TradingV6';
import { formatEther, formatUnits } from '@ethersproject/units';
import { LONG_POSITION, SHORT_POSITION } from 'shared/hooks/useOpenTradeV6';
import { FinalizedTradeDetailsType } from 'types/Trade';
import { useNetworkDetails } from 'shared/contexts/NetworkDetailsContext';
import { polygon } from 'shared/constants/networks';

export default function TradeResultsCard({
    transaction,
}: {
    transaction: FinalizedTradeDetailsType;
}) {
    const { pairString, positionSizeDai, leverage, tp, sl, openPrice, buy, txHash, feesDai } =
        transaction;
    const cardRef = useRef(null);
    const { network } = useNetworkDetails();

    const handleDownloadImage = async () => {
        const element = cardRef.current;
        const canvas = await html2canvas(element);

        const data = canvas.toDataURL('image/jpg');
        const link = document.createElement('a');

        if (typeof link.download === 'string') {
            link.href = data;
            link.download = 'image.jpg';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            window.open(data);
        }
    };

    return (
        <Container ref={cardRef}>
            <ResultsTitle>Your Trade</ResultsTitle>
            <Card animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                <Field>
                    <Label>Pair</Label>
                    <Value>{pairString}</Value>
                </Field>
                <Field>
                    <Label>Size</Label>
                    <Value>
                        {Number(formatEther(positionSizeDai).toString()).toLocaleString(undefined, {
                            maximumSignificantDigits: 6,
                            minimumSignificantDigits: 6,
                        })}{' '}
                        DAI
                    </Value>
                    <Fees>
                        +{' '}
                        {feesDai.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                            minimumSignificantDigits: 4,
                            maximumSignificantDigits: 5,
                        })}{' '}
                        fees
                    </Fees>
                </Field>
                <Field>
                    <Label>Position</Label>
                    <Value>
                        {leverage}x {buy ? LONG_POSITION : SHORT_POSITION}
                    </Value>
                </Field>
                <Field>
                    <Label>Entry Price</Label>
                    <Value>
                        $
                        {Number(formatUnits(openPrice, 10).toString()).toLocaleString(undefined, {
                            maximumSignificantDigits: 6,
                            minimumSignificantDigits: 6,
                        })}
                    </Value>
                </Field>
                <Field>
                    <Label /* style={{ color: '#84e6a4' }} */>Take Profit</Label>
                    <Value>
                        $
                        {Number(formatUnits(tp, 10).toString()).toLocaleString(undefined, {
                            maximumSignificantDigits: 6,
                            minimumSignificantDigits: 6,
                        })}
                    </Value>
                </Field>
                <Field>
                    <Label /* style={{ color: '#f76464' }} */>Stop Loss</Label>
                    <Value>
                        $
                        {Number(formatUnits(sl, 10).toString()).toLocaleString(undefined, {
                            maximumSignificantDigits: 6,
                            minimumSignificantDigits: 6,
                        })}
                    </Value>
                </Field>
            </Card>
            <ActionRow>
                <ActionLink href={network.getExplorerTransactionLink(txHash)} target="_blank">
                    <Icon icon="external-link-alt" size={16} style={{ marginRight: 8 }} />
                    View transaction
                </ActionLink>
                <ActionLink
                    href={
                        network.chainId === polygon.chainId
                            ? 'https://gains.trade/decentralized-trading/'
                            : 'https://gains.trade/testnet-trading/'
                    }
                    target="_blank"
                >
                    <GainsLogo src="/images/gains_logo.png" />
                    Manage trade on Gains
                </ActionLink>
                <ActionButton onClick={handleDownloadImage} style={{ display: 'none' }}>
                    <Icon icon="share-square" size={16} style={{ marginRight: 8 }} />
                    Share Trade
                </ActionButton>
            </ActionRow>
        </Container>
    );
}
