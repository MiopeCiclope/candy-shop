import { screen, waitFor } from '@testing-library/react';
import { Candy } from '../models/candy-model';
import { Response } from '../models/response-model';
import { getAllCandy } from '../utils/api-utils';
import { render } from '../utils/test-utils';
import CandyList from './candy-list';

jest.mock('../utils/api-utils', () => ({
  getAllCandy: jest.fn(),
}));

describe('CandyList Component', () => {
  let mockResponse: Response<Candy[]>;

  beforeEach(() => {
    mockResponse = {
      isSuccessful: true,
      data: [
        {
          name: "candyTest",
          candy: "Dadinho",
          eaten: 5,
          date: "1994-02-15",
        } as Candy,
        {
          name: "candyTest2",
          candy: "Batom",
          eaten: 5,
          date: "1994-02-15",
        } as Candy
      ],
    };
  });

  test('hide loading', async () => {
    (getAllCandy as jest.Mock).mockResolvedValue(mockResponse);
    render(<CandyList />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText('Dadinho')).toBeInTheDocument();
  });

  test('fetches candy', async () => {
    (getAllCandy as jest.Mock).mockResolvedValue(mockResponse);
    render(<CandyList />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Dadinho')).toBeInTheDocument();
    });
    expect(screen.getByText('Batom')).toBeInTheDocument();
  });

  test('display error message', async () => {
    const errorMessage = 'Error fetching candy';
    (getAllCandy as jest.Mock).mockRejectedValue(new Error(errorMessage));

    render(<CandyList />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/error fetching candy/i)).toBeInTheDocument();
    });
  });
});
