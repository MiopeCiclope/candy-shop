import { fireEvent, screen, waitFor } from "@testing-library/react"
import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import CandyList from './candy-list';
import '@testing-library/jest-dom'
import { render } from "../../utils/test-utils";

describe('CandyList Component', () => {
  const handlers = [
    http.get('/api/candy', async () => {
      await delay(50)
      return HttpResponse.json({
        isSuccessful: true,
        data: [
          {
            name: "client1",
            candy: "Dadinho",
            eaten: 5,
            date: "1994-02-15",
          },
          {
            name: "client1",
            candy: "Batom",
            eaten: 2,
            date: "1994-02-15",
          },
          {
            name: "client2",
            candy: "Dadinho",
            eaten: 4,
            date: "1994-02-15",
          },
          {
            name: "client2",
            candy: "Batom",
            eaten: 9,
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

  test('render control buttons', async () => {
    render(<CandyList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

    expect(screen.getByText("Raw Data")).toBeInTheDocument();
    expect(screen.getByText("Aggregate by Client")).toBeInTheDocument();
    expect(screen.getByText("Aggregate by Candy")).toBeInTheDocument();
  });

  test('fetches candy', async () => {
    render(<CandyList />);
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

    render(<CandyList />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

    expect(screen.getByText(/error fetching candy/i)).toBeInTheDocument();
  });

  test('display aggregation by client', async () => {
    render(<CandyList />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

    const buttonElement = screen.getByText(/Aggregate by Client/i);
    fireEvent.click(buttonElement);

    expect(screen.queryByText('Dadinho')).not.toBeInTheDocument();
    expect(screen.queryByText('Batom')).not.toBeInTheDocument();

    expect(screen.getByText(/client1/i)).toBeInTheDocument();
    expect(screen.getByText(/7/i)).toBeInTheDocument();

    expect(screen.getByText(/client2/i)).toBeInTheDocument();
    expect(screen.getByText(/13/i)).toBeInTheDocument();
  });

  test('display aggregation by candy', async () => {
    render(<CandyList />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

    const buttonElement = screen.getByText(/Aggregate by Candy/i);
    fireEvent.click(buttonElement);

    expect(screen.queryByText('client1')).not.toBeInTheDocument();
    expect(screen.queryByText('client2')).not.toBeInTheDocument();

    expect(screen.getByText(/Dadinho/i)).toBeInTheDocument();
    expect(screen.getByText(/9/i)).toBeInTheDocument();

    expect(screen.getByText(/Batom/i)).toBeInTheDocument();
    expect(screen.getByText(/11/i)).toBeInTheDocument();
  });

});
