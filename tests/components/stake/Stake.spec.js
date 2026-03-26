import { shallowMount } from '@vue/test-utils';
import { nextTick, reactive } from 'vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import Stake from '../../../scripts/stake/Stake.vue';

const { emitterState, mockEventEmitter } = vi.hoisted(() => {
    const emitterState = {
        listeners: new Map(),
    };

    const mockEventEmitter = {
        on: (event, listener) => {
            emitterState.listeners.set(event, listener);
            return () => emitterState.listeners.delete(event);
        },
        emit: (event, ...args) => {
            if (emitterState.listeners.has(event)) {
                emitterState.listeners.get(event)(...args);
            }
        },
    };
    return { emitterState, mockEventEmitter };
});

let mockWalletStore;
let mockSettingsStore;
let walletA;
let walletB;

vi.mock('../../../scripts/composables/use_wallet', () => ({
    useWallets: () => mockWalletStore,
}));

vi.mock('../../../scripts/composables/use_settings', () => ({
    useSettings: () => mockSettingsStore,
}));

vi.mock('../../../scripts/composables/use_alerts.js', () => ({
    useAlerts: () => ({
        createAlert: vi.fn(),
    }),
}));

vi.mock('../../../scripts/network/network_manager', () => ({
    getNetwork: () => ({}),
}));

vi.mock('../../../scripts/legacy.js', () => ({
    validateAmount: () => true,
}));

vi.mock('../../../scripts/database', () => ({
    Database: {
        getInstance: async () => ({
            getSettings: async () => ({ coldAddress: '' }),
            setSettings: async () => {},
            getAccount: async () => null,
        }),
    },
}));

vi.mock('../../../scripts/event_bus', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        getEventEmitter: () => mockEventEmitter,
    };
});

describe('Stake wallet switching', () => {
    beforeEach(() => {
        emitterState.listeners.clear();

        walletA = reactive({
            balance: 0,
            coldBalance: 0,
            price: 1,
            currency: 'USD',
            isViewOnly: false,
            isHardwareWallet: false,
            getKeyToExport: () => 'wallet-a',
            createAndSendTransaction: vi.fn(async () => true),
            getNewChangeAddress: vi.fn(() => 'address-a'),
        });
        walletB = reactive({
            balance: 0,
            coldBalance: 15 * 100000000,
            price: 1,
            currency: 'USD',
            isViewOnly: false,
            isHardwareWallet: false,
            getKeyToExport: () => 'wallet-b',
            createAndSendTransaction: vi.fn(async () => true),
            getNewChangeAddress: vi.fn(() => 'address-b'),
        });

        mockWalletStore = reactive({
            activeWallet: walletA,
            activeVault: {
                isEncrypted: false,
                isViewOnly: false,
            },
        });

        mockSettingsStore = reactive({
            advancedMode: false,
            displayDecimals: 2,
        });
    });

    it('updates StakeBalance when active wallet switches via wallet-selected event', async () => {
        const wrapper = shallowMount(Stake, {
            global: {
                stubs: {
                    StakeBalance: {
                        name: 'StakeBalance',
                        props: ['coldBalance'],
                        template: '<div class="stake-balance-stub">{{ coldBalance }}</div>',
                    },
                    StakeInput: true,
                    Activity: true,
                    RestoreWallet: true,
                },
            },
        });

        const getColdBalance = () =>
            wrapper.findComponent({ name: 'StakeBalance' }).props('coldBalance');

        expect(getColdBalance()).toBe(0);

        mockWalletStore.activeWallet = walletB;
        mockEventEmitter.emit('wallet-selected', 'wallet-b');
        await nextTick();

        expect(getColdBalance()).toBe(15 * 100000000);
    });
});
