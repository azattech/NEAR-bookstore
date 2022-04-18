import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import getConfig from "./config";
import { v4 as uuid4 } from "uuid";
import {
  formatNearAmount,
  parseNearAmount,
} from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

const nearConfig = getConfig(process.env.NODE_ENV || "development");

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(
    Object.assign(
      { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
      nearConfig
    )
  );

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  window.walletConnection = new WalletConnection(near);

  // Getting the Account ID. If still unauthorized, it's just empty string
  window.accountId = window.walletConnection.getAccountId();

  // Initializing our contract APIs by contract name and configuration
  window.contract = await new Contract(
    window.walletConnection.account(),
    nearConfig.contractName,
    {
      // View methods are read only. They don't modify the state, but usually return some value.
      viewMethods: ["getBooks", "getBook"],
      // Change methods can modify the state. But you don't receive the returned value when called.
      changeMethods: ["setBook", "buyBook", "deleteBook"],
    }
  );
}

export function logout() {
  window.walletConnection.signOut();
  window.location.replace(window.location.origin + window.location.pathname);
}

export function login() {
  window.walletConnection.requestSignIn(nearConfig.contractName);
}

export async function accountBalance() {
  return formatNearAmount(
    (await window.walletConnection.account().getAccountBalance()).total,
    2
  );
}

export function addBook(book) {
  book.id = uuid4();
  book.price = parseNearAmount(book.price + "");
  return window.contract.setBook({ book });
}

export function getBooks() {
  return window.contract.getBooks();
}

export async function buyBook({ id, price }) {
  await window.contract.buyBook({ bookId: id }, GAS, price);
}

export function deleteBook({ id }) {
  window.contract.deleteBook({ id });
}
