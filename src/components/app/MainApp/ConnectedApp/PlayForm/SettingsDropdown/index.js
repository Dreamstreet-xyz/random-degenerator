import { QuestionIcon, Tooltip } from 'components/common';
import { Menu } from 'components/common/Dropdown/styles';
import { Dropdown, Row, Label, Input } from './styles';

export default function SettingsDropdown({ slippage, setSlippage, isVisible, close }) {
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
                <Row>
                    <Input
                        id="slippage"
                        name="slippage"
                        value={slippage}
                        onChange={e => setSlippage(e.target.value)}
                        maxLength={3}
                    />
                    <span style={{ marginBottom: -6 }}>%</span>
                </Row>
            </Menu>
        </Dropdown>
    );
}
