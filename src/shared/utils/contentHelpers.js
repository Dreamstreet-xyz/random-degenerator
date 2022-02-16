export const truncateAddress = address => {
    if (!address) return '';

    if (address.length > 14) {
        return `${address.substr(0, 6)}...${address.substr(address.length - 4, address.length)}`;
    }
    return address;
};
