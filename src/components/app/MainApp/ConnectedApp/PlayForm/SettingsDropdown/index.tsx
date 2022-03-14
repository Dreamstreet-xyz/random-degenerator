import { QuestionIcon, Tooltip } from 'components/common';
import { Menu } from 'components/common/Dropdown/styles';
import { PlayFormSettingsType, DegenLevel, TradeDirection } from 'types/Trade';
import { Dropdown, Row, Label, Input } from './styles';
import Select from './Select';

export default function SettingsDropdown({
    settings,
    setSettings,
    isVisible,
    close,
}: {
    settings: PlayFormSettingsType;
    setSettings: (settings: PlayFormSettingsType) => void;
    isVisible: boolean;
    close: () => void;
}) {
    const {
        slippageP: slippage,
        degenLevel,
        direction,
        details: { degenOptions, directionOptions },
    } = settings;

    const handleDegenLevelChange = level => {
        setDegenLevel(level);
    };

    const handleDirectionChange = level => {
        setDirection(level);
    };

    const setSlippage = (slippage: string) => setSettings({ ...settings, slippageP: slippage });
    const setDegenLevel = (level: DegenLevel) => setSettings({ ...settings, degenLevel: level });
    const setDirection = (direction: TradeDirection) => setSettings({ ...settings, direction });

    return (
        <Dropdown title="Transaction Settings" close={close} isVisible={isVisible}>
            <Menu>
                <Row>
                    <Label htmlFor="slippage">Slippage Tolerance</Label>
                    <Tooltip content="Your transaction will revert if the price changes unfavorably by more than this percentage.">
                        <span style={{ marginLeft: 8 }}>
                            <QuestionIcon />
                        </span>
                    </Tooltip>
                </Row>
                <Row style={{ marginBottom: 16 }}>
                    <Input
                        id="slippage"
                        name="slippage"
                        value={slippage}
                        onChange={e => setSlippage(e.target.value)}
                        maxLength={3}
                    />
                    <span style={{ marginBottom: -6 }}>%</span>
                </Row>
                <Row style={{ marginBottom: 8 }}>
                    <Label>Degen Level</Label>
                    <Tooltip content="Increases odds to be more or less degen">
                        <span style={{ marginLeft: 8 }}>
                            <QuestionIcon />
                        </span>
                    </Tooltip>
                </Row>
                <Row>
                    <Select
                        value={degenLevel}
                        options={degenOptions}
                        onChange={handleDegenLevelChange}
                    />
                </Row>
                <Row style={{ marginBottom: 8, marginTop: 8 }}>
                    <Label>Direction</Label>
                    <Tooltip content="Restricts the trade direction">
                        <span style={{ marginLeft: 8 }}>
                            <QuestionIcon />
                        </span>
                    </Tooltip>
                </Row>
                <Row>
                    <Select
                        value={direction}
                        options={directionOptions}
                        onChange={handleDirectionChange}
                    />
                </Row>
            </Menu>
        </Dropdown>
    );
}
