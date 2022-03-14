import { QuestionIcon, Tooltip } from 'components/common';
import { Menu } from 'components/common/Dropdown/styles';
import { Dropdown, Row, Label, Input } from './styles';
import Select from './Select';

export default function SettingsDropdown({
    slippage,
    setSlippage,
    degenLevel,
    degenOptions,
    setDegenLevel,
    isVisible,
    close,
}) {
    const handleDegenLevelChange = level => {
        setDegenLevel(level);
    };

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
                    <Tooltip content="Select your preferred degen level.">
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
            </Menu>
        </Dropdown>
    );
}
