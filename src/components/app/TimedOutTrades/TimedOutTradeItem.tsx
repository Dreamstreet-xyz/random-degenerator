import { TableRow, ClaimCollateralButtonWrapper, ClaimCollateralButton } from './styles';
export default function TimedOutTradeItem({
    key,
    tradeId,
    loading,
    isClaimed,
    onClaim,
}: {
    key: string;
    tradeId: string;
    loading: boolean;
    isClaimed: boolean;
    onClaim: () => void;
}) {
    const handleClose = e => {
        e.stopPropagation();
        onClaim();
    };

    return (
        <TableRow>
            <ClaimCollateralButtonWrapper>
                <ClaimCollateralButton
                    onClick={handleClose}
                    disabled={isClaimed}
                    loading={loading}
                    rightIconName={isClaimed ? 'check-circle' : 'times'}
                    title={isClaimed ? 'Claimed' : 'Claim Collateral'}
                />
            </ClaimCollateralButtonWrapper>
        </TableRow>
    );
}
