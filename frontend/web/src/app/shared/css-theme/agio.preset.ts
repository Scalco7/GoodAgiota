import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const Agio = definePreset(Aura, {
    semantic: {
        primary: {
            50: '#E6F9F9',
            100: '#B3F0F0',
            200: '#80E0E0',
            300: '#4DD0D0',
            400: '#26BDBD',
            500: '#02A3A3',
            600: '#028E8E',
            700: '#027373',
            800: '#015858',
            900: '#013F3F',
            950: '#002A2A'
        },
        surface: {
            0: '#F6FDFC',
            50: '#E9FAF6',
            100: '#D7F5EE',
            200: '#B2E9DE',
            300: '#8DDCCF',
            400: '#5DC7B6',
            500: '#34B29E',
            600: '#279280',
            700: '#1E7062',
            800: '#154E44',
            900: '#0C2C27',
            950: '#061613',
        },
        colorScheme: {
            light: {
                primary: {
                    color: '#02A3A3',
                    inverseColor: '#FFFFFF',
                    hoverColor: '#028E8E',
                    activeColor: '#027373'
                },
                highlight: {
                    background: '#02A3A3',
                    focusBackground: '#028E8E',
                    color: '#FFFFFF',
                    focusColor: '#FFFFFF'
                },
                text: {
                    color: '#1B1B1B',
                    hover: {
                        color: '#026A6A',
                        muted: {
                            color: '#6B7A7A',
                        }
                    },
                    muted: {
                        color: '#9CAAAA',
                    },
                    secondary: {
                        color: '#FFFFFF',
                        hover: {
                            color: '#D6FFFF',
                            muted: {
                                color: '#A8EDED',
                            }
                        },
                        muted: {
                            color: '#7FD0D0',
                        }
                    }
                }
            }
        }
    }
});