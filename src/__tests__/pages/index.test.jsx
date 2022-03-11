import { render, screen } from '@testing-library/react';
import Index from '@/pages';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { RouterContext } from 'next/dist/shared/lib/router-context';


describe('Home test', () => {
    it('renders a search', async () => {
        let router = jest.mock('next/router', () => ({ useRouter: () => ({ basePath: '/' }) }));
        render(
            <Provider store={store} >
                <RouterContext.Provider value={router} >
                    <Index />
                </RouterContext.Provider>
            </Provider>)

        let title = await screen.findByPlaceholderText('Search movies...');

        expect(title).toBeInTheDocument();
    });
});