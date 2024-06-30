import { screen, waitFor } from "@testing-library/react"
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import CandyList from './candy-list';
import '@testing-library/jest-dom'
import { render } from "../../utils/test-utils";
import { handlers } from "../../utils/mock-utils";

describe('CandyList Component', () => {
  const server = setupServer(...handlers)
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('hide loading', async () => {
    render(<CandyList aggregateKey={null} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());
  });

  test('fetches candy', async () => {
    render(<CandyList aggregateKey={null} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

    expect(screen.queryAllByText(/Dadinho/i).length).toBeGreaterThan(0)
    expect(screen.queryAllByText(/Batom/i).length).toBeGreaterThan(0)
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

    render(<CandyList aggregateKey={null} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

    expect(screen.getByText(/error fetching candy/i)).toBeInTheDocument();
  });
});
