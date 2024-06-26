import { screen, waitFor } from "@testing-library/react"
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { render } from '../utils/test-utils';
import CandyList from './candy-list';
import '@testing-library/jest-dom'

describe('CandyList Component', () => {
  const handlers = [
    http.get('/api/candy', async () => {
      await delay(50)
      return HttpResponse.json({
        isSuccessful: true,
        data: [{
          name: "candyTest",
          candy: "Dadinho",
          eaten: 5,
          date: "1994-02-15",
        }, {
          name: "candyTest2",
          candy: "Batom",
          eaten: 5,
          date: "1994-02-15",
        }
        ]
      })
    })
  ]

  const server = setupServer(...handlers)
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('hide loading', async () => {
    render(<CandyList />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
  });

  test('fetches candy', async () => {
    render(<CandyList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

    expect(screen.getByText('Dadinho')).toBeInTheDocument();
    expect(screen.getByText('Batom')).toBeInTheDocument();
  });

  test('display error message', async () => {
    server.use(
      http.get('/api/candy', async () => {
        await delay(50)
        return HttpResponse.json({
          isSuccessful: false,
          data: []
        })
      })
    )

    render(<CandyList />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

    expect(screen.getByText(/error fetching candy/i)).toBeInTheDocument();
  });
});
