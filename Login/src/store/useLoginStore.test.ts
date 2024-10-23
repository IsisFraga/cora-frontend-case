import { act } from "@testing-library/react";
import axios from "axios";
import { useLoginStore } from "./useLoginStore";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useLoginStore", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    const store = useLoginStore.getState();
    store.logout();
  });

  it("should initialize with default values", () => {
    const store = useLoginStore.getState();

    expect(store.cpf).toBe("");
    expect(store.password).toBe("");
    expect(store.isLoading).toBe(false);
    expect(store.error).toBeNull();
    expect(store.isAuthenticated).toBe(false);
    expect(store.token).toBeNull();
  });

  it("should update cpf", () => {
    act(() => {
      useLoginStore.setState({ cpf: "35819357833" });
    });

    expect(useLoginStore.getState().cpf).toBe("35819357833");
  });

  it("should update password", () => {
    act(() => {
      useLoginStore.setState({ password: "123456" });
    });

    const updatedState = useLoginStore.getState();
    expect(updatedState.password).toBe("123456");
  });

  it("should handle successful authentication", async () => {
    const mockToken = "test-token";
    mockedAxios.post.mockResolvedValueOnce({ data: { token: mockToken } });

    await act(async () => {
      const store = useLoginStore.getState();
      store.setCpf("35819357833");
      store.setPassword("123456");
      await store.handleAuth();
    });

    const updatedState = useLoginStore.getState();
    expect(updatedState.isAuthenticated).toBe(true);
    expect(updatedState.token).toBe(mockToken);
    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error).toBeNull();
    expect(window.localStorage.getItem("token")).toBe(mockToken);
  });

  it("should handle authentication failure", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Auth failed"));

    await act(async () => {
      const store = useLoginStore.getState();
      await store.handleAuth();
    });

    const updatedState = useLoginStore.getState();
    expect(updatedState.isAuthenticated).toBe(false);
    expect(updatedState.token).toBeNull();
    expect(updatedState.isLoading).toBe(false);
    expect(updatedState.error).toBe(
      "Falha na autenticação. Por favor, verifique suas credenciais."
    );
    expect(window.localStorage.getItem("token")).toBeNull();
  });

  it("should handle logout", async () => {
    window.localStorage.setItem("token", "test-token");

    act(() => {
      useLoginStore.setState({
        isAuthenticated: true,
        token: "test-token",
      });
    });

    const storeBeforeLogout = useLoginStore.getState();
    expect(storeBeforeLogout.isAuthenticated).toBe(true);

    act(() => {
      storeBeforeLogout.logout();
    });

    const updatedState = useLoginStore.getState();
    expect(updatedState.isAuthenticated).toBe(false);
    expect(updatedState.token).toBeNull();
    expect(updatedState.cpf).toBe("");
    expect(updatedState.password).toBe("");
    expect(updatedState.error).toBeNull();
    expect(window.localStorage.getItem("token")).toBeNull();
  });

  it("should check auth status from localStorage", () => {
    window.localStorage.setItem("token", "test-token");

    act(() => {
      const store = useLoginStore.getState();
      store.checkAuthStatus();
    });

    const updatedState = useLoginStore.getState();
    expect(updatedState.isAuthenticated).toBe(true);
    expect(updatedState.token).toBe("test-token");
  });

  it("should correctly return authentication status", () => {
    const store = useLoginStore.getState();
    expect(store.getIsAuthenticated()).toBe(false);

    window.localStorage.setItem("token", "test-token");

    act(() => {
      store.checkAuthStatus();
    });

    expect(store.getIsAuthenticated()).toBe(true);
  });

  it("should make correct API call with credentials", async () => {
    const store = useLoginStore.getState();

    store.setCpf("35819357833");
    store.setPassword("123456");

    await store.handleAuth();

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:3000/auth",
      {
        cpf: "35819357833",
        password: "123456",
      }
    );
  });
});
