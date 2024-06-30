import { fireEvent, screen, waitFor } from "@testing-library/react"
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom'
import { render } from "./utils/test-utils";
import App from "./App";
import { handlers } from "./utils/mock-utils";

describe('App Component', () => {
  const server = setupServer(...handlers)
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('render control buttons', async () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument());

    expect(screen.getByText("Raw Data")).toBeInTheDocument();
    expect(screen.getByText("Aggregate by Client")).toBeInTheDocument();
    expect(screen.getByText("Aggregate by Candy")).toBeInTheDocument();
  });

  test('display aggregation by client', async () => {
    render(<App />);

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
    render(<App />);

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
